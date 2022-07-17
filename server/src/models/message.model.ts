import { MessageModel } from '../../types/model.types';
import { DataTypes } from 'sequelize';
import db from '../services/db.services'
import User from './user.model';

const Message = db.define<MessageModel>('Message', {
  ID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  senderID:{type:DataTypes.INTEGER},
  receiverID: {type:DataTypes.INTEGER},
  message: {
    type: DataTypes.STRING,
    allowNull: false
  }
})

User.hasOne(Message, {
  foreignKey: {name:"senderID", allowNull: false}
})

User.hasOne(Message, {
  foreignKey: {name:"receiverID", allowNull: false}
})

export default Message