import type { AddressInterface } from '../backend/firestore';
interface UserState {
  isLoggedIn: boolean;
  isAdmin?: boolean;
  email: string;
  uid: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
  firebaseToken: string;
  adminApproved: boolean;
  merchantSlug: string;
  user: CombinedUserCompanySchema;
}
interface CustomerState extends CustomerPayload {
  isLoggedIn: boolean;
  isAdmin?: boolean;
  email: string;
  uid: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
  firebaseToken: string;
  adminApproved?: boolean;
  customerSlug: string;
  user?: CustomerPayload;
}
interface UserFirebasePayload {
  firebaseToken: string;
}

interface EditFormState {
  fullName: string;
  email: string;
  phone: string;
  socialMediaLink: string;
  serviceTypes: string;
  achievements: string;
  specificRequests: string;
  professionType: string;
  state: string;
  city: string;
  workExperience: number;
  profession: string;
  bio: string;
}

interface EditFormCompany {
  companyName: string;
  companyAddress: string;
  fullName: string;
  email: string;
  companyPhone: string;
  tieupDetails: string;
  socialMediaLink: string;
  website: string;
  achievements: string;
  specificRequests: string;
  aboutTheCompany: string;
}

interface CombinedUserCompanySchema {
  companyName?: string;
  companyAddress?: string;
  displayName: string;
  email: string;
  companyPhone?: string;
  tieupDetails?: string;
  socialMediaLink: string;
  website?: string;
  achievements: string;
  certifications: string;
  specificRequests: string;
  aboutTheCompany?: string;
  phone?: string;
  serviceTypes?: string;
  professionType?: string;
  state?: string;
  city?: string;
  slug: string;
  workExperience?: number;
  profession?: [];
  categories: [];
  bio?: string;
  accountType: string;
  address?: AddressInterface;
  languages: string;
  razorpay_order_id: string,
  razorpay_payment_id : string,
  razorpay_signature: string,
  subscription: boolean,
  subscriptionStartDate: string
  subscriptionEndDate: string,
  plan?: string,
  uid?:string,
  subscription_change?:boolean,
  ndaSigned?:any,
  // razorpay: any{}
}

type PortFolioRoutes =
  | 'portfolio'
  | 'feed'
  | 'services'
  | 'events'
  | 'products'
  | 'order-requests'
  | 'subscription';

interface CustomerPayload {
  displayName: string;
  email: string;
  phone: string;
  dob: string;
}

export type {
  UserState,
  CombinedUserCompanySchema,
  UserFirebasePayload,
  EditFormState,
  EditFormCompany,
  PortFolioRoutes,
  CustomerPayload,
  CustomerState
}