import { UserState } from '../interfaces';
import { CombinedUserCompanySchema } from '../interfaces/frontend/user';
export const userState: UserState = {
  isLoggedIn: false,
  isAdmin: false,
  email: '',
  uid: '',
  displayName: '',
  photoURL: '',
  emailVerified: false,
  firebaseToken: '',
  adminApproved: false,
  merchantSlug: '',
  user: {} as CombinedUserCompanySchema,
};
