import { frontendRoutes } from './frontend-routes';
export const screens = [
  {
    title: 'Login',
    href: frontendRoutes.LOGIN_FOR_MERCHANT_INDIVIDUAL,
  },
  {
    title: 'Sign Up',
    href: frontendRoutes.SIGNUP_FOR_MERCHANT_INDIVIDUAL,
  },
];

export const companyScreens = [
  {
    title: 'Login',
    href: frontendRoutes.LOGIN_FOR_MERCHANT_COMPANY,
  },
  {
    title: 'Sign Up',
    href: frontendRoutes.SIGNUP_FOR_MERCHANT_COMPANY,
  },
];

export const imagePaths = [
  '/screen-graphics/signup/individual/graphic-1.svg',
  '/screen-graphics/signup/individual/graphic-2.svg',
  '/screen-graphics/signup/individual/graphic-3.svg',
];

export const companySignupImagePaths = [
  '/screen-graphics/signup/company/graphic1.svg',
  '/screen-graphics/signup/company/graphic2.svg',
  '/screen-graphics/signup/company/graphic3.svg',
];
export const individualSignupImagePaths = [
  '/screen-graphics/signup/graphic1.svg',
  '/screen-graphics/signup/graphic2.svg',
  '/screen-graphics/signup/graphic3.svg',
];
export const individualLoginImagePaths = [
  '/screen-graphics/login/graphic1.svg',
  '/screen-graphics/login/graphic2.svg',
  '/screen-graphics/login/graphic3.svg',
];
export const companyLoginImagePaths = [
  '/screen-graphics/login/company/graphic1.svg',
  '/screen-graphics/login/company/graphic2.svg',
  '/screen-graphics/login/company/graphic3.svg',
];
export const resetPasswordImagePaths = [
  '/screen-graphics/forgot/graphic1.svg',
  '/screen-graphics/forgot/graphic2.svg',
  '/screen-graphics/forgot/graphic3.svg',
];
