export const newMerchantIndividualRegistrationKeys = [
  'uid',
  'email',
  'accountType',
  'userType',
  'displayName',
  'professionType',
  'workExperience',
  'socialMediaLink',
  'achievements',
  'specificRequests',
  'address',
  'profession',
  'categories'
];

export const newMerchantBusinessRegistrationKeys = [
  'uid',
  'email',
  'accountType',
  'adminApproval',
  'userType',
  'displayName',
  'companyName',
  'tieupDetails',
  'website',
  'bio',
  'achievements',
  'specificRequests',
  'companyAddress',
  'languages',
];

export const customerKeys = [
  'uid',
  'email',
  'phone',
  'displayName',
  'photoURL',
  'userType',
  'slug',
];

const dbVersion = process.env.NODE_ENV
  ? process.env.NODE_ENV === 'development'
    ? 'db-dev'
    : 'db-dev'
  : 'db-dev';

export const constDocumentRefs = {
  userAccounts: `${dbVersion}/user-status`,
  users_pending: `${dbVersion}/users/pending`,
  users_verified: `${dbVersion}/users/verified`,
  users_rejected: `${dbVersion}/users/rejected`,
  categories: `${dbVersion}/categories`,
  customers: `${dbVersion}/users/customers`,
  profile_images: `${dbVersion}/user-metadata/portfolios/users-dp`,
  users: `${dbVersion}/users`,
  slugs: `${dbVersion}/slugs`,
  slug_uids: `${dbVersion}/slugs-uids`,
  users_registered: `${dbVersion}/phone-numbers`,
  users_portfolio_image: `${dbVersion}/user-metadata/portfolios/images`,
  users_feed_image: `${dbVersion}/feeds/images`,
  users_feed_caption: `${dbVersion}/feeds/images`,
  users_stories: `${dbVersion}/stories/user-stories`,
  merchants_meta_loc: `${dbVersion}/user-metadata/portfolios/meta`,
  merchants_pending: `${dbVersion}/user-metadata/portfolios/meta/pending`,
  merchants_rejected: `${dbVersion}/user-metadata/portfolios/meta/rejected`,
  merchants_verified: `${dbVersion}/user-metadata/portfolios/meta/verified`,
  image_portfolio_ref_events: `${dbVersion}/user-metadata/portfolio/events`,
  image_portfolio_ref_services: `${dbVersion}/user-metadata/portfolio/services`,
  image_portfolio_ref_products: `${dbVersion}/user-metadata/portfolio/products`,
  storage_events: `${dbVersion}/user-metadata/portfolio/events`,
  storage_services: `${dbVersion}/user-metadata/portfolio/services`,
  pdf_services: `${dbVersion}/user-metadata/merchant/merchant-forms`,
  contact_info: `${dbVersion}/user-metadata/subscription`,
  user_comments: `${dbVersion}/user-metadata/comments`,
  feed_notifications: `${dbVersion}/user-metadata/notifications`,
};

export const specificDocumentRefs = {
  users_dev: 'db-dev/users',
  users_prod: 'db-prod/users',
  user_status_dev: 'db-dev/user-status',
  user_status_prod: 'db-prod/user-status',
};
