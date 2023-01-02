import type { CombinedUserCompanySchema } from '../../frontend/user';
export interface ExpectedUpdaeUserPayload {
  firebaseToken: string;
  updatedUserData: CombinedUserCompanySchema;
}
