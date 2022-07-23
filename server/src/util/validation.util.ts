import { MessageAttributes, UserIdOnly, UserWithPass } from "../../types/models.types";

export const userFieldsValidation = (
  user: UserWithPass | UserIdOnly,
  checkId?: boolean
): boolean => {
  const { ID, firstName, lastName, nickname, password } = user;

  if (firstName && lastName && nickname && password) return true;
  if (checkId && ID != null) return true;

  return false;
};
export const messageFieldsValidation = (
  mess: MessageAttributes,
): boolean => {
  const {senderID, receiverID, message }: MessageAttributes = mess;

  if (senderID && receiverID && message) return true;

  return false;
};
