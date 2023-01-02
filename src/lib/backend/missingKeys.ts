export const determineMissingKeysinAnObject = (object: any, keys: string[]) => {
  const missingKeys = keys.filter((key) => object[key] === undefined);
  if (missingKeys.length) {
    return {
      error: true,
      msg: `${missingKeys.join(', ')} are must have params.`,
    };
  }
  return {
    error: false,
  };
};
