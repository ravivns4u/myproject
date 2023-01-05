export interface SocialHandles {
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
  youtube?: string;
  website?: string;
}

export interface Achievement {
  time: string;
  title: string;
  description: string;
  ref: string;
}

export type Services = 'Social Media Promotion' | 'Networking' | 'Our Tie-Ups';

export interface Address {
  address: string;
  city: string;
  state: string;
}

export interface RequiredSignupFields {
  //All those fields that are required and
  //that need to be Validated
  email: string;
  password: string;
  confirmPassword: string;
  verificationCode: string;
}

export interface OptionalSignupFields {
  accountType?: string;
  name?: string;
  profession?: string;
  bio?: string;
  levelofProfession?: string;
  workExperienceInYears?: number;
  socialHandles?: SocialHandles;
  achievements?: Achievement[];
  services?: Services;
  specificRequests?: string;
  address?: Address;
  specificDetails?: string;
  tieups?: string;
}

export interface SignupFormError {
  error: boolean;
  message: string;
}

export interface SignupState {
  required: RequiredSignupFields;
  optionals: OptionalSignupFields;
  loading: boolean;
  errors: SignupFormError;
}

export interface SignUpPayload {
  key: keyof RequiredSignupFields;
  value: string;
}
