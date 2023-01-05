import {
  FireStoreProductSchema,
  ICreateProductUser,
} from '../../../../../redux/interfaces/backend/apis/v2/products/product.interfaces';

export const giveFrontendRelevantData = (
  products: FireStoreProductSchema
): ICreateProductUser => {
  return {
    productName: products.productName,
    productDetails: products.productDetails,
    productCategory: products.productCategory,
    productProfession:products.productProfession,
    productCurrencyType: products.productCurrencyType,
    productPrice: products.productPrice,
    discountedPrice: products.discountedPrice,
    images: products.images,
    id: products.id,
    uid: products.uid,
    creator_name: products.creator_name,
    storageFolderRef: products.storageFolderRef,
  };
};
