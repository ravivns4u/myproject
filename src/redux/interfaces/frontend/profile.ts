import { DocumentType } from '../../interfaces/backend/apis/admin-apis/pending-events';
export interface IAdminEvents {
  eventType: DocumentType;
  firebaseToken: string;
  startWith: number;
  endAt: number;
}
