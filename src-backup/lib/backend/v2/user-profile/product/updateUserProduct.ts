import { constDocumentRefs } from '../../../../../firebase/constants/firestore';
import Server from '../../../../../firebase/firebase_server_exports';
import { InsertionType } from '../../../../../redux/interfaces/backend/apis/v2/common';
import {
  FireStoreProductSchema,
  ICreateProductUser,
} from '../../../../../redux/interfaces/backend/apis/v2/products/product.interfaces';
import { fetchCategories } from '../../utils/fetchers';
import { giveFrontendRelevantData } from './productUtility';

//Initializations
const categories = fetchCategories().then((data) => data);
const productsCollection = 'products-collection';

// Create A Product

export const createAProductV2 = async (
  productDetails: ICreateProductUser,
  uid: string,
  uniqueProductFolderName: string,
  creator_name: string
): Promise<{ valid: boolean; msg: string }> => {
  const { valid, msg } = await validateProductEntryV2(productDetails, true);
  if (!valid) return { valid, msg };
  const uploadLocation = `${constDocumentRefs.merchants_pending}/${uid}/${productsCollection}/${uniqueProductFolderName}`;

  const uploadDocument: FireStoreProductSchema = {
    //FE
    productName: productDetails.productName,
    productPrice: productDetails.productPrice,
    discountedPrice: productDetails.discountedPrice,
    productCategory: productDetails.productCategory,
    productDetails: productDetails.productDetails,
    productCurrencyType: productDetails.productCurrencyType,
    productProfession:productDetails.productProfession,
    images: productDetails.images,
    storageFolderRef: productDetails.storageFolderRef,

    //BE
    id: uploadLocation,
    createdAt: new Date().getTime(),
    modifiedAt: new Date().getTime(),
    creator_name,
    uid,
  };

  await Server.db.doc(uploadLocation).set(uploadDocument, { merge: true });
  return { valid: true, msg: 'Created' };
};

// Validate Product
export const validateProductEntryV2 = async (
  productDetails: ICreateProductUser,
  performExistCheck: boolean = false
): Promise<{ valid: boolean; msg: string }> => {
  // console.log(productDetails, 'Product Details')
  /*
        1. Non Empty Product Name
        2. Price must be greater than equal to zero
        3. Discounted Price must be less than Fixed Price
        4. Categories must match with one of the available Categories
        5. Check if the folder is correctly uploaded or not.
        
    */

  //Non Empty Product Name
  if (!productDetails.productName)
    return { valid: false, msg: 'Product Name is empty' };

  //Price must be greater than equal to zero
  if (productDetails.productPrice <= 0)
    return { valid: false, msg: 'Price must be greater than zero' };
  // Discounted Price must be greater than Fixed Price
  if (productDetails.productPrice <= productDetails.discountedPrice)
    return {
      valid: false,
      msg: 'Discounted Price must be less than Fixed Price',
    };
  // Categories must match with one of the available Categories
  /*if (!(await categories).featured.includes(productDetails.productCategory))
    return { valid: false, msg: 'Invalid Category!' };*/

  if(typeof !productDetails.productCategory.toString()){
    productDetails.productCategory.map(async value => {
      if (!(await categories).category.includes(value)) {
        return { valid: false, msg: "Invalid Category" };
      }
    })
  }else{
    if (!(await categories).category.includes(productDetails.productCategory.toString())) {
      return { valid: false, msg: "Invalid Category" };
    }
  }

  if (productDetails.images.length === 0)
    return { valid: false, msg: 'One Image is Required' };

  const folderRef = productDetails?.images?.[0]?.firebaseFolderLocation;
  const firstFile = productDetails?.images?.[0]?.imageAbsPath;

  if (performExistCheck) {
    const exists = await Server.storage
      .bucket(process.env.FB_STORAGE_BUCKET_NAME)
      .file(firstFile)
      .exists();
    if (!exists) {
      await deleteExistingFolder(folderRef);
      return { valid: false, msg: 'Image not found' };
    }
  }

  return { valid: true, msg: '' };
};

//Get Products
export const getProductsV2 = async (
  uid: string,
  location: InsertionType,
  startAt: number,
  endAt: number
): Promise<any> => {
  const startIndex = startAt ?? 0;
  const endIndex = endAt ?? 100;

  const products = await Server.db
    .collection(
      `${constDocumentRefs.merchants_meta_loc}/${location}/${uid}/${productsCollection}`
    )
    .offset(startIndex)
    .limit(endIndex)
    .orderBy('modifiedAt', 'desc')
    .get();
  const results = products.docs.map((doc) =>
    doc.data()
  ) as FireStoreProductSchema[];
  return await getProductSignedUrl(results);
};

export const modifyProductDetails = async (
  formDetails: ICreateProductUser,
  uid: string
): Promise<{ valid: boolean; msg: string }> => {
  const { valid, msg } = await validateProductEntryV2(formDetails);
  if (!valid) return { valid, msg };
  const productId = formDetails.id ?? '';
  if (productId === '')
    return { valid: false, msg: 'Product Invalid or not Found' };
  if (!productId.includes(uid))
    return { valid: false, msg: 'Product not found in active repo' };

  const product = await Server.db.doc(productId).get();
  if (!product.exists) return { valid: false, msg: 'Product not Found' };
  const productData = product.data() as FireStoreProductSchema;

  productData.discountedPrice = formDetails.discountedPrice;
  productData.productDetails = formDetails.productDetails;
  productData.productName = formDetails.productName;
  productData.productPrice = formDetails.productPrice;
  productData.productCategory = formDetails.productCategory;
  productData.productProfession = formDetails.productProfession;
  productData.productCurrencyType = formDetails.productCurrencyType;
  productData.modifiedAt = new Date().getTime();
  productData.images = formDetails.images.map((element) => ({ ...element }));
  productData.storageFolderRef = formDetails.storageFolderRef;
  await Server.db.doc(productId).set(productData, { merge: true });
  return { valid: true, msg: 'Updated' };
};

export const deleteExistingFolder = async (folderRef: string) => {
  try {
    await Server.storage
      .bucket(process.env.FB_STORAGE_BUCKET_NAME)
      .deleteFiles({ prefix: folderRef });
  } catch (err) {
    console.log('Error happened while deleting: ', err);
  }
  return true;
};

//Delete A Product
export const deleteProductV2 = async (productId: string, uid: string) => {
  if (!productId.includes(uid)) {
    return { valid: false, msg: 'Invalid User Id' };
  }
  const product = await Server.db.doc(productId).get();
  if (!product.exists) return { valid: false, msg: 'Product not Found' };
  const productData = product.data() as FireStoreProductSchema;
  const folderRef = productData.storageFolderRef;
  await deleteExistingFolder(folderRef);
  await Server.db.doc(productId).delete();
  return { valid: true, msg: 'Deleted' };
};

//https://www.sentinelstand.com/article/guide-to-firebase-storage-download-urls-tokens

//Get Admin Products

export const getAdminProducts = async (
  productLocation: InsertionType,
  startAt: number,
  endAt: number
) => {
  const startIndex = startAt ?? 0;
  const endIndex = endAt ?? 100;
  const address = Server.db.collection(
    `${constDocumentRefs.merchants_meta_loc}/${productLocation}`
  );
  const documentReferences = await address.listDocuments();
  const documentIds = documentReferences.map((it) => it.id);

  const productPromises = documentIds.map(
    (element) =>
      new Promise((resolve) => {
        address
          .doc(element)
          .collection(productsCollection)
          .orderBy('modifiedAt', 'desc')
          .offset(startIndex)
          .limit(endIndex)
          .get()
          .then((data) => {
            const dataDocument = data.docs.map((dd) => {
              const individualData = dd.data();
              return individualData;
            });
            resolve(dataDocument);
          });
      })
  );

  const products = (await Promise.all(productPromises)) as any[];

  const productsData = products.reduce((acc, curr) => {
    return [...acc, ...curr];
  }, [] as FireStoreProductSchema[]);

  return await getProductSignedUrl(productsData);
};

export const markAdminProduct = async (
  productId: string,
  inVerified: boolean
) => {
  const product = await Server.db.doc(productId).get();
  if (!product.exists) return { valid: false, msg: 'Product not Found' };
  const productData = product.data() as FireStoreProductSchema;

  const newLocKeyword = inVerified ? 'verified' : 'rejected';
  const replacements = ['pending', 'verified', 'rejected'];
  const locSplits = productId.split('/');
  if (locSplits.length < 8) {
    return { valid: false, msg: 'Invalid Location' };
  }

  const newLocation = locSplits
    .map((element) =>
      replacements.includes(element) ? newLocKeyword : element
    )
    .join('/');
  productData.id = newLocation;

  await Server.db.doc(newLocation).set(productData, { merge: true });
  await Server.db.doc(productId).delete();
  return { valid: true, msg: 'Updated' };
};

const getProductSignedUrl = async (
  results: FireStoreProductSchema[]
): Promise<ICreateProductUser[]> => {
  const timeoutThreshold = 90000;
  const currentTime = Date.now();
  const extendedTime = currentTime + 2 * 60 * 60 * 1000;

  const promises = results.map(
    (element) =>
      new Promise(async (resolve) => {
        const { images } = element;
        const imagePromises = images.map((image) => {
          if (image.imageExpiryTimeStamp > currentTime + timeoutThreshold)
            return image.imagePreview;
          return Server.storage
            .bucket(process.env.FB_STORAGE_BUCKET_NAME)
            .file(image.imageAbsPath)
            .getSignedUrl({
              version: 'v4',
              action: 'read',
              expires: extendedTime, // 2 hours
            })
            .then((res) => res[0]);
        });
        Promise.all(imagePromises).then((urls) => {
          urls.forEach((url, index) => {
            element.images[index].imagePreview = url;
            element.images[index].imageExpiryTimeStamp = extendedTime;
          });
          resolve(giveFrontendRelevantData(element));
        });
      })
  );
  const productResults = (await Promise.all(promises)) as ICreateProductUser[];
  return productResults;
};
