import { DeleteEventType } from '../../../../components/Profile/Body/Body';
import type { ImagePortfolio } from './ImagePortfolio';
import type { ImageFeed } from './ImageFeed';
import type { ServiceRequestForm } from './servicePortfolio';
import { InsertionType } from './v2/common';

type DeleteOpsTypes = 'images' | 'videos' | 'services' | 'text';
export interface DeletePointerService {
  id: string;
  uid: string;
  imagePath: string;
  deleteOperationType: DeleteOpsTypes;
  serviceImageLoc: string;
}
export interface DeletePointer {
  collectionId: string;
  uid: string;
  imagePath?: string;
  deleteOperationType: DeleteOpsTypes;
  isService: boolean;
}
export interface DeletePointer1 {
  collectionId: string;
  uid: string;
  imagePath: string;
  deleteOperationType: DeleteOpsTypes;
  isService: boolean;
}

export interface DeleteProductPointer {
  productRef: string;
  folderName: string;
  dbType: 'pending' | 'approved' | 'rejected';
}

export interface EditPointer {
  collectionId: string;
  uid: string;
  editOperationType: DeleteOpsTypes;
  data: ImagePortfolio | ServiceRequestForm | ImageFeed;
  isService: boolean;
}

export interface DeleteRequest {
  firebaseToken: string;
  data:
    | DeletePointer
    | DeleteProductPointer
    | DeleteEventType
    | DeletePointerService;
  deleteProd?: boolean;
}

export interface DeleteServiceRequest {
  firebaseToken: string;
  data: DeletePointerService;
}
