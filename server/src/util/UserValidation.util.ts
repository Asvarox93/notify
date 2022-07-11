import { UserAttributes } from "../../types"

export const userFieldsValidation = (user: UserAttributes, chechId?: boolean): boolean => {
  const {ID, firstName, lastName, nickname, password }: UserAttributes = user
  
  if (!firstName && !lastName && !nickname && !password) return false
  if (chechId && ID == null ) return false

  return true
}