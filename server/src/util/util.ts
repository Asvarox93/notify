import bcrypt from "bcrypt";
import path from "path";

export const setErrorMessage = (error: unknown) => {
  let message = "Unknown error";
  if (error instanceof Error) message = error.message;
  return message;
};

export const encryptPassword = async (password: string) => {
  const hashPassword = await bcrypt.hash(password, 10);
  return hashPassword;
};

export const resolveFilePath = (folder: string, filename?: string) => {
  const dirname = path.resolve() + "/src/" + folder;

  if (filename) return path.join(dirname, filename);

  return dirname;
};
