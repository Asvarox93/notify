import { MessangeModel } from './../../types';
import { DataTypes } from 'sequelize';
import db from '../../database/dbConnect'

const Message = db.define<MessangeModel>('Messange', {
  ID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  senderID: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  receiverID: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  messange: {
    type: DataTypes.STRING,
    allowNull: false
  }
})

export default Message