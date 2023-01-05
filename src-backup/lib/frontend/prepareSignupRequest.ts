import type { SignupFormState } from '../../redux/interfaces';
import type {
  NewUserProfessionalMetaData,
  ProfessionType,
  NewUserMerchantMetaData,
  ProfessionalAccountType,
} from '../../redux/interfaces/backend/firestore';

import type { SignupFormCompanyFormState } from '../../redux/interfaces';
import { CustomerPayload } from '../../redux/interfaces/frontend/user';
import { FirebaseCustomerSchema } from '../../redux/interfaces/backend/firestore/registerNewUser';

interface ExpectedRequest {
  idToken: string;
  data: NewUserProfessionalMetaData;
  userType: ProfessionalAccountType;
}

interface ExpectedMerchantRequest {
  idToken: string;
  data: NewUserMerchantMetaData;
  userType: ProfessionalAccountType;
}
export const prepareIndividualSignupRequest = (
  formValue: SignupFormState,
  uid: string,
  idToken: string
): ExpectedRequest => {
  const profileObject: NewUserProfessionalMetaData = {
    uid,
    email: formValue.email,
    phone: formValue.phone,
    accountType: 'Individual',
    userType: 'Professionals',
    displayName: formValue.fullName,
    professionType: formValue.professionType as ProfessionType,
    workExperience: formValue.workExperience,
    socialMediaLink: formValue.socialMediaLink,
    achievements: formValue.achievements,
    specificRequests: formValue.specificRequests,
    address: {
      state: formValue.state,
      city: formValue.city,
      address: '',
    },
    profession: formValue.profession,
    categories: formValue.categories,
    serviceTypes: formValue.serviceTypes,
    languages: formValue.languages,
    certifications: '',
    bio: formValue.bio,
  };
  const requestProfileObj: ExpectedRequest = {
    idToken,
    data: profileObject,
    userType: 'Individual',
  };
  return requestProfileObj;
};

export const prepareCompanySignupRequest = (
  formValue: SignupFormCompanyFormState,
  uid: string,
  idToken: string
): ExpectedMerchantRequest => {
  const profileObject: NewUserMerchantMetaData = {
    uid,
    email: formValue.email,
    accountType: 'Business',
    adminApproval: 'Pending',
    phone: formValue.companyPhone,
    userType: 'Professionals',
    displayName: formValue.fullName,
    companyName: formValue.companyName,
    tieupDetails: formValue.tieupDetails,
    website: formValue.website,
    bio: formValue.aboutTheCompany,
    achievements: formValue.achievements,
    specificRequests: formValue.specificRequests,
    socialMediaLink: formValue.socialMediaLink,
    companyAddress: formValue.companyAddress,
    profession: formValue.profession,
    categories: formValue.categories,
    certifications: '',
  };
  const requestProfileObj: ExpectedMerchantRequest = {
    idToken,
    data: profileObject,
    userType: 'Business',
  };
  return requestProfileObj;
};

export const prepareCustomerSignupRequest = (payload: CustomerPayload, uid: string): FirebaseCustomerSchema => ({
  ...payload,
  uid,
  photoURL: '/portfolio/person.png',
  userType: 'Customers',
  slug: '',
});
