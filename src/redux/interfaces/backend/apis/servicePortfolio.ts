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
  serviceState: string;
  serviceCity: string;
  serviceGender: string;
  currency: string;
  servicePricing: number;
  serviceLanguage: string;
  serviceImageLoc: string;
  serviceFileType: string;
  createdAt?: string;
  modifiedAt: string;
  lastModifiedBy: 'User' | 'Admin';
  serviceSubscription: ServiceSubscription;
  creator_uid: string;
  creator_name: string;
  creator_dp_loc: string;
  panIndia: boolean;
  absImagePath: string;
  profession:[];
  category:[];
}

export interface ServiceRequestForm {
  //FE
  id: string;
  serviceName: string;
  // serviceDuration: string; //Actually points to service Genre
  serviceDescription: string;
  serviceState: string;
  serviceCity: string;
  servicePricing: number;
  serviceLanguage: string;
  serviceImageLoc: string;
  serviceFileType: string;
  panIndia: boolean;
  currency: string;
  serviceGender: string;
  absImagePath: string;
  profession:any[];
  category:any[];

  //backend fetched
  creator_uid?: string;
  creator_name?: string;
  creator_dp_loc?: string;
  publicUri?: string;
}

export interface ServiceRequestPayload {
  payload: ServiceRequestForm;
  firebaseToken: string;
  modification: boolean;
  isService: boolean;
}
