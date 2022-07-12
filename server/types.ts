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

export type MessageAttributes = {
  ID: number,
  senderID: number,
  receiverID: number,
  message: string
}
export type MessageOptionalAttributes = Optional<MessageAttributes, 'ID'>;
export type MessageModel = Model<MessageAttributes, MessageOptionalAttributes>