import { MessageAttributes, UserWithPass } from "../../types/models.types";

export const userFieldsValidation = (
  user: UserWithPass,
  checkId?: boolean
): boolean => {
  const { ID, firstName, lastName, nickname, password }: UserWithPass = user;
  

  if (firstName && lastName && nickname && password) return true;
  if (checkId && ID != null) return true;

  return false;
};
export const messageFieldsValidation = (
  mess: MessageAttributes,
  checkId?: boolean
): boolean => {
  const { ID, senderID, receiverID, message }: MessageAttributes = mess;

  if (senderID && receiverID && message) return true;
  if (checkId && ID != null) return true;

  return false;
};
