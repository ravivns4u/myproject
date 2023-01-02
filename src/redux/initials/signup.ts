import { SignupState } from '../interfaces';
export const signUpState: SignupState = {
  required: {
    email: '',
    password: '',
    confirmPassword: '',
    verificationCode: '',
  },
  optionals: {},
  loading: false,
  errors: {
    error: false,
    message: '',
  },
};
