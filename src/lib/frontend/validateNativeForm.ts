export const validationTypes = {
  NON_EMPTY: 'NON_EMPTY',
  EMAIL: 'EMAIL',
  PASSWORD: 'PASSWORD',
  WEBLINK: 'WEBLINK',
  PHONE: 'PHONE',
};

export const signupValidation = (allValues: any) => {
  const { email, companyName, fullName, companyPhone } = allValues;

  const errors: any = {};

  const emailResult = validateEmail(email, email);
  if (emailResult.error) {
    errors.email = emailResult.msg;
  }
  const firstNameResult = nonEmpty(companyName, companyName);
  if (firstNameResult.error) {
    errors.companyName = firstNameResult.msg;
  }

  const lastNameResult = nonEmpty(fullName, fullName);
  if (lastNameResult.error) {
    errors.fullName = lastNameResult.msg;
  }

  const phoneResult = validatePhone(companyPhone, companyPhone);
  if (phoneResult.error) {
    errors.companyPhone = phoneResult.msg;
  }

  return errors;
};

export const updateValidation = (allValues: any) => {
  const { email, companyName, displayName, companyPhone } = allValues;

  if (!email || !companyName || !displayName || !companyPhone) return {};

  const errors: any = {};

  const emailResult = validateEmail(email, email);
  if (emailResult.error) {
    errors.email = emailResult.msg;
  }
  const firstNameResult = nonEmpty(companyName, companyName);
  if (firstNameResult.error) {
    errors.companyName = firstNameResult.msg;
  }

  const lastNameResult = nonEmpty(displayName, displayName);
  if (lastNameResult.error) {
    errors.fullName = lastNameResult.msg;
  }

  const phoneResult = validatePhone(companyPhone, companyPhone);
  if (phoneResult.error) {
    errors.companyPhone = phoneResult.msg;
  }

  return errors;
};

export const updateContactInfo = (allValues: any) => {
  const { displayName, email, phone, city, state } = allValues;

  const errors: any = {};

  const emailResult = validateEmail(email, email);
  if (emailResult.error) {
    errors.email = emailResult.msg;
  }

  const lastNameResult = nonEmpty(displayName, displayName);
  if (lastNameResult.error) {
    errors.displayName = lastNameResult.msg;
  }

  const phoneResult = validatePhone(phone, phone);
  if (phoneResult.error) {
    errors.phone = phoneResult.msg;
  }

  const emptyCity = nonEmpty(city, city);
  if (emptyCity.error) {
    errors.city = lastNameResult.msg;
  }

  const emptyState = nonEmpty(state, state);
  if (emptyCity.error) {
    errors.state = emptyState.msg;
  }

  return errors;
};

export const loginEmailPasswordValidation = (allValues: any, touched: boolean) => {
  const { email } = allValues;
  const errors: any = {};

  if (touched) {
    const emailResult = validateEmail(email, email);
    if (emailResult.error) {
      errors.email = emailResult.msg;
    }
  }

  return errors;
};

export const signupCustomers = (allValues: any) => {
  const { displayName, email, phone, password, confirmPassword } = allValues;

  const errors: any = {};

  const emailResult = validateEmail(email, email);
  if (emailResult.error) {
    errors.email = emailResult.msg;
  }
  if (password.length < 8) {
    errors.password = 'Password must be at least 8 characters long.';
  }
  if (password !== confirmPassword) {
    errors.password = 'Passwords do not match.';
  }

  const lastNameResult = nonEmpty(displayName, displayName);
  if (lastNameResult.error) {
    errors.displayName = lastNameResult.msg;
  }

  const phoneResult = validatePhone(phone, phone);
  if (phoneResult.error) {
    errors.phone = phoneResult.msg;
  }

  return errors;
};

export const signupValidationIndividual = (allValues: any, touched: string) => {
  const { email, fullName, phone, socialMediaLink, achievements, specificRequests, bio } = allValues;

  const errors: any = {};

  const emailResult = validateEmail(email, email);
  if (emailResult.error && touched == 'email') {
    errors.email = emailResult.msg;
  }

  const lastNameResult = nonEmpty(fullName, fullName);
  if (lastNameResult.error && touched == 'fullName') {
    errors.fullName = lastNameResult.msg;
  }

  const phoneResult = validatePhone(phone, phone);
  if (phoneResult.error && touched == 'phone') {
    errors.phone = phoneResult.msg;
  }

  const socialMediaLinkResult = nonEmpty(socialMediaLink, socialMediaLink);
  if (socialMediaLinkResult.error && touched == 'socialMediaLink') {
    errors.socialMediaLink = socialMediaLinkResult.msg;
  }

  const bioResult = nonEmpty(bio, bio);
  if (bioResult.error && touched == 'bio') {
    errors.bio = bioResult.msg;
  }

  const achievementsResult = nonEmpty(achievements, achievements);
  if (achievementsResult.error && touched == 'achievements') {
    errors.achievements = achievementsResult.msg;
  }

  return errors;
};

export const updateValidationIndividual = (allValues: any, touched: boolean) => {
  const { email, displayName, phone, socialMediaLink, achievements, specificRequests } = allValues;

  if (!email || !displayName || !phone || !socialMediaLink || !achievements) return {};

  const errors: any = {};

  const emailResult = validateEmail(email, email);
  if (emailResult.error && touched) {
    errors.email = emailResult.msg;
  }

  const lastNameResult = nonEmpty(displayName, displayName);
  if (lastNameResult.error && touched) {
    errors.fullName = lastNameResult.msg;
  }

  const phoneResult = validatePhone(phone, phone);
  if (phoneResult.error && touched) {
    errors.phone = phoneResult.msg;
  }

  const socialMediaLinkResult = nonEmpty(socialMediaLink, socialMediaLink);
  if (socialMediaLinkResult.error && touched) {
    errors.socialMediaLink = socialMediaLinkResult.msg;
  }

  const achievementsResult = nonEmpty(achievements, achievements);
  if (achievementsResult.error && touched) {
    errors.achievements = achievementsResult.msg;
  }

  return errors;
};

interface ErrorResult {
  error: boolean;
  msg: string;
}

const nonEmpty = (checkValue: any, _: any): ErrorResult => {
  return {
    error: !(checkValue && checkValue.length > 0),
    msg: checkValue && checkValue.length > 0 ? '' : 'This field is required.',
  };
};

const validateEmail = (checkValue: any, _: any): ErrorResult => {
  const reg =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const r = new RegExp(reg, 'g').test(checkValue);

  return {
    error: !r,
    msg: r ? '' : 'Error incorrect email format.',
  };
};

const validatePassword = (password: any, _: any) => {
  const r = password.length >= 8;
  return {
    error: !r,
    msg: r ? '' : 'Error incorrect password format.',
  };
};

const validateWebsite = (website: any, _: any) => {
  const regex =
    /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm;
  const r = regex.test(website);
  return {
    error: !r,
    msg: r ? '' : 'Error incorrect website format.',
  };
};

const validatePhone = (number: any, _: any) => {
  const replacers = ['+', '(', ')', ' ', '-'];
  let phoneNumber = number;
  replacers.forEach((replacer) => {
    phoneNumber = replaceAll(phoneNumber, replacer);
  });
  const regex = /^[0-9]{12,15}$/;
  const r = regex.test(phoneNumber);
  return {
    error: !r,
    msg: r ? '' : 'Error incorrect phone number format.',
  };
};

const replaceAll = (string: string, valueToReplace: string) => {
  return string.split(valueToReplace).join('');
};

export const replaceArrayOfElements = (string: string, values: string[]) => {
  return values.reduce((acc, val) => {
    return replaceAll(acc, val);
  }, string);
};
