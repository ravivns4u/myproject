import { CurrencyTypes } from '../../productPortfolio';

export interface IProductImageDetails {
  imageName: string;
  imageAbsPath: string;
  imageType: string;
  imagePreview: string;
  imageExpiryTimeStamp: number;
  firebaseFolderLocation: string;
}

export interface ICreateProductUser {
  productName: string;
  productCurrencyType: CurrencyTypes;
  productPrice: number;
  discountedPrice: number;
  productDetails: string;
  productCategory: any[];
  productProfession: any[];
  images: IProductImageDetails[];
  storageFolderRef: string;

  //Obtained from BE:
  id?: string;
  uid?: string;
  creator_name?: string;
}

export interface ICreateProductBackend {
  id: string;
  uid: string;
  creator_name: string;
  createdAt: number;
  modifiedAt: number;
}

export type FireStoreProductSchema = ICreateProductBackend & ICreateProductUser;
