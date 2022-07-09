import { Model, Optional } from "sequelize/types"

export type UserAttributes = {
  ID?:number,
  firstName: string,
  lastName: string,
  nickname: string,
  password: string
}
export type UserOptionalAttributes = Optional<UserAttributes, 'ID'>;
export type UserModel = Model<UserAttributes, UserOptionalAttributes>

export type MessangeAttributes = {
  ID: number,
  senderID: number,
  receiverID: number,
  messange: string
}
export type MessangeOptionalAttributes = Optional<MessangeAttributes, 'ID'>;
export type MessangeModel = Model<MessangeAttributes, MessangeOptionalAttributes>