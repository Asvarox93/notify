import bcrypt from "bcrypt";

export const setErrorMessage = (error: unknown) => {
  let message = "Unknown error";
  if (error instanceof Error) message = error.message;
  return message;
};

export const encryptPassword = async (password: string) => {
  const hashPassword = await bcrypt.hash(password, 10);
  return hashPassword
};
