import {
  RequiredSignupFields,
  SignupFormErrors,
  textFieldVariantInterface,
  textFieldSizeInterface,
} from '../../redux/interfaces';

export const requiredFormConstants = [
  {
    key: 'email' as keyof RequiredSignupFields,
    label: 'Email Address',
    variant: 'outlined' as textFieldVariantInterface,
    size: 'small' as textFieldSizeInterface,
    errorInfoKey: 'email' as keyof SignupFormErrors,
    type: 'email',
  },
  {
    key: 'password' as keyof RequiredSignupFields,
    label: 'Password',
    variant: 'outlined' as textFieldVariantInterface,
    size: 'small' as textFieldSizeInterface,
    errorInfoKey: 'password' as keyof SignupFormErrors,
    type: 'password',
  },
  {
    key: 'confirmPassword' as keyof RequiredSignupFields,
    label: 'Re Enter Password',
    variant: 'outlined' as textFieldVariantInterface,
    size: 'small' as textFieldSizeInterface,
    errorInfoKey: 'confirmPassword' as keyof SignupFormErrors,
    type: 'password',
  },
  {
    key: 'verificationCode' as keyof RequiredSignupFields,
    label: 'Enter OTP',
    variant: 'outlined' as textFieldVariantInterface,
    size: 'small' as textFieldSizeInterface,
    errorInfoKey: 'verificationCode' as keyof SignupFormErrors,
    type: 'password',
  },
];
