export type DocumentType = 'pending' | 'rejected';

export interface EventsFirebaseData {
  serviceCity: string;
  serviceSubscription: {
    approved: any[];
    approvedByAdmin: any[];
    rejected: any[];
    requested: any[];
  };
  serviceDescription: string;
  isDeleted: boolean;
  servicePricing: string;
  serviceDuration: string;
  lastModifiedBy: string;
  isDeletedByAdmin: true;
  serviceFileType: string;
  serviceState: string;
  serviceMaxCapacity: number;
  serviceName: string;
  serviceImageLoc: string;
  modifiedAt: string;
  createdAt: string;
  imageStorageLoadPath: string;
}
