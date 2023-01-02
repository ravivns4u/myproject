export const validatePhone = (number: string) => {
  const phoneNumber = phoneNumberConverter(number);
  const regex = /^[0-9]{11,15}$/;
  return regex.test(phoneNumber);
};

const replaceAll = (string: string, valueToReplace: string) =>
  string.split(valueToReplace).join('');

export const phoneNumberConverter = (firebasePhoneNumber: string): string => {
  const replacers = ['+', '(', ')', ' ', '-'];
  let phoneNumber = firebasePhoneNumber;
  replacers.forEach((replacer) => {
    phoneNumber = replaceAll(phoneNumber, replacer);
  });
  return phoneNumber;
};
