import { MessageAttributes } from './../../types';
import { UserWithPass } from "../../types"

export const userFieldsValidation = (user: UserWithPass, checkId?: boolean): boolean => {
  const {ID, firstName, lastName, nickname, password }: UserWithPass = user
  
  if (!firstName && !lastName && !nickname && !password) return false
  if (checkId && ID == null ) return false

  return true
}
export const messageFieldsValidation = (mess: MessageAttributes, checkId?: boolean): boolean => {
  const {ID, senderID, receiverID, message }: MessageAttributes = mess
  
  if (!senderID && !receiverID && !message) return false
  if (checkId && ID == null ) return false

  return true
}