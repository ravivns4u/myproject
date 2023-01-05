export interface ServiceSubscription {
  requested: string[];
  approved: string[];
  approvedByAdmin: string[];
  rejected: string[];
}

export interface ServicePortfolio {
  //Firebase Schema
  id?: string | number;
  imageStorageLoadPath: string;
  serviceName: string;
  // serviceDuration: string;
  serviceDescription: string;
  serviceImageLoc: string;
  serviceFileType: string;
  createdAt?: string;
  modifiedAt: string;
  lastModifiedBy: 'User' | 'Admin';
  creator_uid: string;
  creator_name: string;
  creator_dp_loc: string;

export interface ServiceRequestForm {
  //FE
  id: string;
  serviceName: string;
  // serviceDuration: string; //Actually points to service Genre
  serviceDescription: string;
  serviceImageLoc: string;
  serviceFileType: string;
  publicUri?: string;
}

export interface ServiceRequestPayload {
  payload: ServiceRequestForm;
  firebaseToken: string;
  modification: boolean;
  isService: boolean;
}
