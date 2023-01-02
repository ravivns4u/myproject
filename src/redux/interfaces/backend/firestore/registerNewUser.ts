export interface AddressInterface {
  state: string;
  city: string;
  address: string;
}

export type ProfessionalAccountType = 'Individual' | 'Business';
export type ProfessionType = 'Beginner' | 'Intermediate' | 'Expert';

export interface NewUserProfessionalMetaData {
  id?: string | number;
  uid: string;
  email: string;
  phone: string;
  accountType: 'Individual' | 'Business';
  userType: 'Professionals' | 'Customers';
  displayName: string;
  professionType: ProfessionType;
  workExperience: number;
  socialMediaLink: string;
  achievements: string;
  certifications: string;
  specificRequests: string;
  address: AddressInterface;
  slug?: string;
  profession: [];
  categories: [];
  serviceTypes: string;
  languages: string;
  bio?: string;
}
export type BusinessAccount = 'Business';

export interface NewUserMerchantMetaData {
  id?: string | number;
  uid: string;
  email: string;
  accountType: BusinessAccount;
  phone: string;
  adminApproval: 'Pending' | 'Fulfilled' | 'Rejected';
  userType: 'Professionals';
  displayName: string;
  companyName: string;
  tieupDetails: string;
  website: string;
  bio: string;
  achievements: string;
  specificRequests: string;
  slug?: string;
  socialMediaLink: string;
  companyAddress: string;
  certifications: string;
  profession: [];
  categories: [];
}

export interface FireStoreMerchantCompanySchema {
  uid: string;
  email: string;
  phone: string;
  modifiedTimeStamp: string;
  createdTimeStamp: string;
  lastModifiedBy: 'User' | 'Admin';
  accountType: BusinessAccount;
  adminApproval: 'Pending' | 'Fulfilled' | 'Rejected';
  userType: 'Professionals';
  displayName: string;
  companyName: string;
  tieupDetails: string;
  website: string;
  bio: string;
  achievements: string;
  certifications: string;
  specificRequests: string;
  companyAddress: string;
  slug: string;
  socialMediaLink: string;
  profession: string;
  categories: string;
}

export interface FireStoreMerchantUserSchema {
  uid: string;
  email: string;
  phone: string;
  modifiedTimeStamp: string;
  createdTimeStamp: string;
  lastModifiedBy: 'User' | 'Admin';
  accountType: 'Individual' | 'Business';
  adminApproval: 'Pending' | 'Fulfilled' | 'Rejected';
  userType: 'Professionals' | 'Customers';
  displayName: string;
  bio?: string;
  professionType: 'Beginner' | 'Intermediate' | 'Expert';
  workExperience: number;
  socialMediaLink: string;
  achievements: string;
  certifications: string;
  slug: string;
  profession: [];
  categories: [];
  specificRequests: string;
  state: string;
  city: string;
  serviceTypes: string;
  isAdmin?: boolean;
  languages: string;
  subcription: boolean;
}

export interface FireStoreMerchantUserSchema {
  uid: string;
  email: string;
  phone: string;
  modifiedTimeStamp: string;
  createdTimeStamp: string;
  lastModifiedBy: 'User' | 'Admin';
  accountType: 'Individual' | 'Business';
  adminApproval: 'Pending' | 'Fulfilled' | 'Rejected';
  userType: 'Professionals' | 'Customers';
  displayName: string;
  bio?: string;
  professionType: 'Beginner' | 'Intermediate' | 'Expert';
  workExperience: number;
  socialMediaLink: string;
  achievements: string;
  certifications: string;
  slug: string;
  profession: [];
  categories: [];
  specificRequests: string;
  state: string;
  city: string;
  serviceTypes: string;
  isAdmin?: boolean;
  languages: string;
  subcription: boolean;
}

export type DataSchema = NewUserProfessionalMetaData | NewUserMerchantMetaData | FirebaseCustomerSchema;

//Admin View Schemas

export interface AdminFrontendMerchantViewSchema {
  id: string | number;
  companyName: string;
  companyAddress: string;
  fullName: string;
  email: string;
  companyPhone: string;
  tieupDetails: string;
  socialMediaLink: string;
  aboutTheCompany: string;
  website: string;
  achievements: string;
  specificRequests: string;
}

export interface AdminFrontendIndividualViewSchema {
  id: string | number;
  displayName: string;
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
  profession: any;
  categories: any;
}

//Customers

export interface FirebaseCustomerSchema {
  uid: string;
  email: string;
  phone: string;
  displayName: string;
  photoURL: string;
  userType: 'Customers';
  slug: string;
}
