import { Model, Optional } from "sequelize/types"

export interface UserAttributes {
  ID?:number,
  firstName: string,
  lastName: string,
  nickname: string,
}
export interface UserWithPass extends UserAttributes {
  password: string
}
export type UserOptionalAttributes = Optional<UserWithPass, 'ID'>;
export type UserModel = Model<UserWithPass, UserOptionalAttributes>

export type MessageAttributes = {
  ID: number,
  senderID: number,
  receiverID: number,
  message: string
}
export type MessageOptionalAttributes = Optional<MessageAttributes, 'ID'>;
export type MessageModel = Model<MessageAttributes, MessageOptionalAttributes>

export type Login = {
  username: string,
  password: string
}

