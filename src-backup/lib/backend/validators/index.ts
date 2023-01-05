import { validateEmail } from './emails';
import { validatePhone } from './phoneNumber';
export const validatorTypes = {
  EMAIL: 'email',
  PHONE: 'phone',
};

export type ValidatorTypes = keyof typeof validatorTypes;

export const isValidStringField = (
  value: string,
  fieldType: ValidatorTypes
): boolean => {
  switch (fieldType) {
    case validatorTypes.EMAIL:
      return validateEmail(value);
    case validatorTypes.PHONE:
      return validatePhone(value);
    default:
      return false;
  }
};
