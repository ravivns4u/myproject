import { IMetaData } from '../apis/';
export interface ImageFeed {
  fileName: string;
  fullPath: string;
  textContent: string;
  generation: string;
  uid: string;
  createdAt?: string;
  modifiedAt?: string;
  publicUri?: string;
  fp: string;
  fileType?:string;
}
export interface Caption {
  fileType?: string;
  caption: string;
  fullPath: string;
  // textContent: string;
  generation: string;
  uid: string;
  createdAt?: string;
  // modifiedAt?: string;
  // publicUri?: string;
  fp: string;
}
export interface ImageFeedData {
  fileName?: string;
  fullPath: string;
  textContent: string;
  generation?: string;
  uid: string;
  fp: string;
  image?: string;
  publicUri?: string;
  metadata: IMetaData;
  title?:string

}

export interface CaptionFeedData {
  caption?:string;
  description?:string;
  fp: string;
  fullPath: string;
  metadata: object;
  fileType?: string;
}

export interface ReqPayload {
  payload: ImageFeedData;
  firebaseToken: string;
  modification: boolean;
}

export interface ReqFeedPayload {
  payload: CaptionFeedData;
  firebaseToken: string;
  modification: boolean;
}
