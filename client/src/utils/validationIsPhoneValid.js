export const validationIsPhoneValid = (string) => {
  if (string.length < 10) return false;

  const reg = /^[\+]?[(]?[0-9]{1,3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,9}$/im;
  return reg.test(string);
};
