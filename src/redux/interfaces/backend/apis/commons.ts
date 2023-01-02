import { FireStoreMerchantUserSchema } from '../firestore';
import type { ImagePortfolio } from './ImagePortfolio';
import type { ImageFeed } from './ImageFeed';
import type { ServiceRequestForm } from './servicePortfolio';

export type DataInterfaceElements = ImagePortfolio[] | ServiceRequestForm[];

export type DataInterfaceElements1 = ImageFeed[];

export interface DataInterface {
  portfolios: DataInterfaceElements;
  feeds: DataInterfaceElements1;
  uris: string[];
}

export interface ExpectedResponse {
  error: boolean;
  data: DataInterface;
}

export interface UserResponse {
  getImagePortfoliosByIndices: ImagePortfolio[];
  getServicesPendingByIndices: ServiceRequestForm[];
  getEventsPendingByIndices: ServiceRequestForm[];
  getImageFeedsByIndices: Imagefeed[];
}

export interface UserDetailsAdminData {
  firebaseToken: string;
  isIndividual: boolean;
  getRejected: boolean;
}

export interface VerifyUsersAdmin {
  firebaseToken: string;
  uids: string[];
  inVerified: boolean;
}

export interface AdminUsers {
  firebaseToken: string;
}

export interface IProtectMerchantMetaData {
  uid: string;
  user: FireStoreMerchantUserSchema;
}

export interface IUserEvents {
  eventType: 'rejected' | 'pending';
  firebaseToken: string;
  startWith: number;
  endAt: number;
}

export interface IUserApproveEvents {
  inVerified: boolean;
  eventLocations: string[];
  firebaseToken: string;
}

export interface IAccountDetails {
  firebaseToken: string;
  isIndividual: boolean;
  inVerified: boolean;
  startWith: number;
  endAt: number;
}

export interface IMarkAccounts {
  firebaseToken: string;
  inVerified: boolean;
  uids: string[];
}

export interface IUserDetails {
  uid: string;
  firebaseToken: string;
}
