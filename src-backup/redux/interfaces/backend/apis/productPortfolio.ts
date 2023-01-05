import type { EditDataForm, IMetaData } from './';
export type CurrencyTypes = 'USD' | 'INR' | 'EUR';
import { DeletePointer, DeleteProductPointer } from '../apis/deleteInterfaces';
import { ICreateProductUser } from './v2/products/product.interfaces';
export interface FileInterface {
  preview: string;
  file?: any;
  loc?: string;
  type?: string;
  tempView?: string;
}

export interface FileEditInterface {
  preview: string;
  file?: any;
  loc: string;
  type: string;
}

export interface ImageInterface {
  loc: string;
  type: string;
  tempView?: string;
}

export interface ProductPortfolioData {
  title: string;
  description: string;
  pricing: number;
  currency: CurrencyTypes;
  images: FileInterface[];
  folderStoragePath: string;
  folderRef: string;
  location: string;
  metadata: IMetaData;
}

export interface ProductRequestPayload {
  id?: string;
  title: string;
  description: string;
  pricing: number;
  currency: CurrencyTypes;
  images: ImageInterface[];
  folderStoragePath: string;
  folderRef: string;
  location: number;
  metadata: IMetaData;
  category: string;
  discountedPrice: number;
}

interface IProductUserRowFunctions {
  openEditPrompt: (data: EditDataForm) => void;
  deleteData: (
    data: DeletePointer | DeleteProductPointer,
    product?: boolean
  ) => void;
}

export type ProductExpectedPayload = ICreateProductUser &
  IProductUserRowFunctions;

export interface ProductFireStoreSchema {
  id: string;
  title: string;
  description: string;
  pricing: number;
  currency: CurrencyTypes;
  images: ImageInterface[];
  folderStoragePath: string;
  folderRef: string;
  createdAt?: string;
  modifiedAt: string;
  lastModifiedBy: 'User' | 'Admin';
  dbLocRef?: string;
  metadata: IMetaData;
  discountedPrice: number;
  discountPc: number;
  ProductCategory: [];
  productProfession: [];
  uid: string;
}

export interface ReqPayload {
  payload: ProductRequestPayload;
  firebaseToken: string;
  modification: boolean;
  prevDeletions?: FileInterface[];
}

export interface GetPortfolioPayload {
  firebaseToken: string;
  startIndex: number;
  endIndex: number;
}
