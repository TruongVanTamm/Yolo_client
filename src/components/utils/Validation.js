export const isEmpty = (value) => {
  if (!value) return true;
  return false;
};

export const isEmail = (email) => {
  // eslint-disable-next-line
  const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return re.test(email);
};
export const isPassword = (password) => {
  // eslint-disable-next-line
  const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return re.test(password);
};
export const isLength = (password) => {
  if (password.length < 6) return true;
  return false;
};

export const isMatch = (password, cf_password) => {
  if (password === cf_password) return true;
  return false;
};
