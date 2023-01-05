export const convertToSlug = (string: string) => {
  return string
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
};
