export const validationIsNameValid = (string) => {
  if (string.length < 3) return false;

  const reg = /[a-zA-Z]$/;
  return reg.test(string);
};
