import Server from '../../firebase_server_exports';
import { constDocumentRefs } from '../../constants/firestore';
import {
  ProductRequestPayload,
  ProductFireStoreSchema,
  FileInterface,
  ImageInterface,
} from '../../../redux/interfaces/backend/apis/productPortfolio';
import { DeleteProductPointer } from '../../../redux/interfaces/backend/apis/deleteInterfaces';
import { fetchCategories } from '../../../lib/backend/v2/utils/fetchers';

export const getProductByIndices = async (
  uid: string,
  startIndex: number,
  endIndex: number
) => {
  const sI = startIndex ?? 0;
  const eI = endIndex ?? 100;
  try {
    const portfolioRef = Server.db
      .collection(
        `${constDocumentRefs.merchants_pending}/${uid}/products-collection`
      )
      .orderBy('modifiedAt', 'desc')
      .offset(sI)
      .limit(eI);

    const dataRef = await portfolioRef.get();
    if (dataRef.empty) {
      return { error: false, data: [] };
    }
    const portfolios = await dataRef.docs.map((doc) => doc.data());

    const results: any = [];
    portfolios.forEach(async (portfolio, index) => {
      portfolio.images.map((element: ImageInterface) => {
        results.push(
          new Promise((resolve, reject) => {
            Server.storage
              .bucket(process.env.FB_STORAGE_BUCKET_NAME)
              .file(element.loc)
              .getSignedUrl({
                version: 'v4',
                action: 'read',
                expires: Date.now() + 2 * 60 * 60 * 1000, // 2 hours
              })
              .then((res) => {
                resolve({
                  preview: res[0],
                  type: element.type,
                  loc: element.loc,
                  index: index,
                });
              })
              .catch(() => reject({ error: true }));
          })
        );
      });
    });
    const response = await Promise.all(results);
    const finalResult = portfolios.map((portfolio, index) => {
      return {
        ...portfolio,
        images: response.filter((element) => element.index === index),
      };
    });

    return { error: false, data: finalResult };
  } catch (err) {
    console.log('Error 79 = ', err);
    return { error: true, data: [] };
  }
};
const categories = fetchCategories().then((data) => data);

export const updateProductPortfolio = async (
  data: ProductRequestPayload,
  modification: boolean,
  uid: string,
  prevDeletions?: FileInterface[]
): Promise<{ error: boolean; message: string }> => {
  try {
    const { error, message } = await validateProductEntry(data);
    if (error) {
      return { error: true, message };
    }
    const truncatedText = data.description.substring(0, 500);
    const productPath = await figureOutDB(uid, data.folderRef, modification);
    if (productPath === 'Invalid')
      return {
        error: true,
        message:
          'Invalid Product, Corrupted Data. Please Try to create a new Product',
      };
    const portfolioDoc = Server.db.doc(productPath);
    if (prevDeletions) {
      const paths = prevDeletions.map((element) => element.loc ?? '');
      const promises = paths.map((path) =>
        Server.storage
          .bucket(process.env.FB_STORAGE_BUCKET_NAME)
          .file(path)
          .delete()
      );
      await Promise.all(promises);
    }
    const productDocument: ProductFireStoreSchema = {
      ...data,
      description: truncatedText,
      modifiedAt: new Date().toISOString(),
      lastModifiedBy: 'User',
      discountPc: Math.floor(
        (100 * (data.pricing - data.discountedPrice)) / data.pricing
      ),
      discountedPrice: data.discountedPrice,
      category: data.category,
      uid: uid,
      id: productPath,
    };
    !modification && (productDocument.createdAt = new Date().toISOString());
    await portfolioDoc.set(productDocument, { merge: true });
    return { error: false, message: 'Success' };
  } catch (err) {
    console.log('Error happened ', err);
    return { error: true, message: 'Error happened: ' + `${err}` };
  }
};

export const deleteProductPortfolio = async (
  data: DeleteProductPointer,
  uid: string
) => {
  const storagePath = data.productRef;
  const dbPath = `db-dev/user-metadata/portfolios/meta/${data.dbType}/${uid}/products-collection/${data.folderName}`;
  if (!dbPath.includes(uid)) {
    return { error: true };
  } else {
    const bucket = Server.storage.bucket(process.env.FB_STORAGE_BUCKET_NAME);
    await bucket.deleteFiles({
      prefix: storagePath,
    });
    console.log(storagePath, '\n\n', dbPath);
    const document = Server.db.doc(dbPath);
    await document.delete();
    return { error: false };
  }
};

const figureOutDB = async (
  uid: string,
  folderRef: string,
  modification: boolean
) => {
  const pdDoc = `${constDocumentRefs.merchants_pending}/${uid}/products-collection/${folderRef}`;
  const rjDoc = `${constDocumentRefs.merchants_rejected}/${uid}/products-collection/${folderRef}`;
  const vfDoc = `${constDocumentRefs.merchants_verified}/${uid}/products-collection/${folderRef}`;
  let initialCollection = pdDoc;

  if (modification) {
    const pendingDoc = await Server.db.doc(pdDoc).get();
    if (!pendingDoc.exists) {
      const rejectedDoc = await Server.db.doc(rjDoc).get();
      if (rejectedDoc.exists) {
        initialCollection = rjDoc;
      } else {
        const approvedDoc = await Server.db.doc(vfDoc).get();
        if (approvedDoc.exists) {
          initialCollection = vfDoc;
        } else {
          console.log('Returning false');
          return 'Invalid';
        }
      }
    }
  }
  return initialCollection;
};

export const validateProductEntry = async (
  data: ProductRequestPayload
): Promise<{ error: boolean; message: string }> => {
  /*
    - Product Name can't be empty
    - None of the Prices can less than or equal to Zero
    - Discounted Price Must be Less than Fixed Price
    - Categories must match with one of the available Categories
*/
  if ((data.title?.length ?? -1) <= 0) {
    console.log('Not Returning');
    return {
      error: true,
      message: "Product Name can't be empty",
    };
  } else if (data.pricing <= 0) {
    return {
      error: true,
      message: "Fixed Price can't be less than or equal to zero",
    };
  } else if (data.discountedPrice <= 0) {
    return {
      error: true,
      message: "Discounted Price can't be less than or equal to zero",
    };
  } else if (data.discountedPrice >= data.pricing) {
    return {
      error: true,
      message: 'Discounted Price must be less than Fixed Price',
    };
  } else if (!(await categories).events.includes(data.category)) {
    return {
      error: true,
      message: 'Invalid Category!',
    };
  } else if (data.images.length === 0) {
    return {
      error: true,
      message: 'Please Upload at least one image',
    };
  }
  return {
    error: false,
    message: 'All Good',
  };
};
