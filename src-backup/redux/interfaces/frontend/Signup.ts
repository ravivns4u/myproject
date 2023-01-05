export interface SignupFormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  verificationCode?: string;
}

export interface SignupFormState {
  fullName: string;
  email: string;
  phone: string;
  socialMediaLink: string;
  serviceTypes: string;
  specificRequests: string;
  professionType: string;
  state: string;
  city: string;
  workExperience: number;
  achievements: string;
  categories: [];
  profession: [];
  languages: string;
  bio?: string;
}

export interface SignupFormCompanyFormState {
  companyName: string;
  fullName: string;
  email: string;
  companyPhone: string;
  tieupDetails: string;
  socialMediaLink: string;
  aboutTheCompany: string;
  website: string;
  achievements: string;
  specificRequests: string;
  companyAddress: string;
  categories: any;
  profession: any;
}

export interface ErrorInterface {
  valid: boolean;
  msg: string;
  element: keyof SignupFormErrors;
}

export type textFieldVariantInterface = 'outlined' | 'standard' | 'filled' | undefined;

export type textFieldSizeInterface = 'small' | 'medium' | undefined;
