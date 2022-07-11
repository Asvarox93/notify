import { UserAttributes } from '../../types';
import { Request, Response } from 'express';
import Users from '../models/User.model'
import { userFieldsValidation } from '../util/UserValidation.util';
// import {Op} from "sequelize"

const findAll = async (_req:Request, res:Response) => {

  const response = await Users.findAll()
  res.send(response)
}

const create = async (req: Request, res: Response) => {
  if (!userFieldsValidation(req.body)) {
    res.status(400).send({ status: 400, error: "Ups! User cannot be createed. Please try again later!"})
    return
  }
  
  const { firstName, lastName, nickname, password }: UserAttributes = req.body

  const user:UserAttributes = {
    firstName,
    lastName,
    nickname,
    password
  }

  try {
    const response = await Users.create(user)
    if (!response) {
      res.status(400).send({ status: 400, error: "Ups! User cannot be createed. Please try again later!", response: response})
      return
    }
    res.status(201).send({ status: 201, response: response })
  } catch (error:unknown) {
    let message = "Unknown error"
    if (error instanceof Error) message = error.message
    res.status(501).send({ status: 501, error: message })
  }
}

const update = async (req: Request, res: Response) => {
  if (!userFieldsValidation(req.body, true)) {
    res.status(400).send({ status: 400, error: "Not valid data provided. Please try again later!"})
    return
  }

  const { ID, firstName, lastName, nickname, password }: UserAttributes = req.body
  const user:UserAttributes = {
    firstName,
    lastName,
    nickname,
    password
  }
  
  try {
    const response = await Users.update(user, { where: { ID: ID } })

    if (!response[0]) {
      res.status(400).send({ status: 400, error: "Ups! User proporities cannot be updated. Please try again later!" })
      return
    }

    res.status(201).send({ status: 201, response: response })
    
  } catch (error:unknown) {
    let message = "Unknown error"

    if (error instanceof Error) message = error.message

    res.status(501).send({ status: 501, error: message })
  }
}

const UserController = {findAll, create, update}
export default UserController