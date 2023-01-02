import {
  RequiredSignupFields,
  SignupFormErrors,
  ErrorInterface,
} from '../../redux/interfaces';
export const validationKeys = {
  email: 'email',
  password: 'password',
  confirmPassword: 'confirmPassword',
  verificationCode: 'verificationCode',
};

type keyfieldOfExisting = keyof SignupFormErrors;

export const validateInput = (
  allValues: RequiredSignupFields,
  vKeys: keyfieldOfExisting[]
) => {
  const mappedDetails = vKeys
    .map((element) => {
      const key = element as keyof RequiredSignupFields;
      switch (key) {
        case validationKeys.email:
          return validateEmail(allValues, element);

        case validationKeys.password:
          return validatePassword(allValues, element);

        case validationKeys.confirmPassword:
          return comparePassword(allValues, element);

        case validationKeys.verificationCode:
          return { valid: true, msg: '', element: element };
        default:
          return { valid: true, msg: '', element: element };
      }
    })
    .filter((element) => element && !element.valid);

  const initialElement: SignupFormErrors = {};
  const errors = mappedDetails.reduce((acc, curr) => {
    acc[curr.element as keyof RequiredSignupFields] = curr.msg;
    return acc;
  }, initialElement);
  return errors;
};

const validateEmail = (
  allValues: RequiredSignupFields,
  element: keyof SignupFormErrors
): ErrorInterface => {
  const { email } = allValues;
  const reg =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const r = new RegExp(reg, 'g').test(email.toLowerCase());

  return {
    valid: r,
    msg: 'Error incorrect email format.',
    element: element,
  };
};

const validatePassword = (
  allValues: RequiredSignupFields,
  element: keyof SignupFormErrors
): ErrorInterface => {
  const { password } = allValues;
  const r = password.length >= 8;
  return {
    valid: r,
    msg: 'Error password must be at least 8 characters long.',
    element: element,
  };
};

const comparePassword = (
  allValues: RequiredSignupFields,
  element: keyof SignupFormErrors
): ErrorInterface => {
  const { password, confirmPassword } = allValues;
  return {
    valid: password === confirmPassword,
    msg: 'Passwords do not match.',
    element: element,
  };
};
