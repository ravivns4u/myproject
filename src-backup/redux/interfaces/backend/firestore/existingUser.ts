import type { FireStoreMerchantUserSchema } from './';
export interface AccountVerificationResponse {
  adminApproved: boolean;
  account: boolean;
  merchantSlug?: string;
  user?: FireStoreMerchantUserSchema;
  customerSlug?: string;
}
