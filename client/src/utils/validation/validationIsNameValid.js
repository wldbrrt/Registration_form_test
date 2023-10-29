export const validationIsNameValid = (string) => {
  if (string.length < 3) return false;

  const reg = /[a-zA-Zа-яА-Я]$/;
  return reg.test(string);
};
