import { IMetaData } from '../apis/';
export interface ImagePortfolio {
  fileName: string;
  fullPath: string;
  textContent: string;
  title: string;
  generation: string;
  uid: string;
  createdAt?: string;
  modifiedAt?: string;
  publicUri?: string;
  fp: string;
}
export interface ImagePortfolio1 {
  caption: string;
  fullPath: string;
  title: string;
  generation: string;
  uid: string;
  createdAt?: string;
  modifiedAt?: string;
  publicUri?: string;
  fp: string;
}

export interface ImagePortfolioData {
  fileName: string;
  fullPath: string;
  textContent: string;
  title: string;
  category: any[];
  profession: any[];
  generation: string;
  uid: string;
  fp: string;
  image?: string;
  publicUri?: string;
  metadata: IMetaData;
}

export interface ReqPayload {
  payload: ImagePortfolioData;
  firebaseToken: string;
  modification: boolean;
}
