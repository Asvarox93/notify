import { UserAttributes } from './../../types';
import { Request, Response } from 'express';
import Users from './../models/User'
// import {Op} from "sequelize"

const findAll = async (_req:Request, res:Response) => {

  const response = await Users.findAll()
  res.send(response)
}

const create = async (req: Request, res: Response) => {
  const { firstName, lastName, nickname, password }: UserAttributes = req.body

  if (!firstName && !lastName && !nickname && !password) {
    res.status(500).send({ error: "All values must be provided!" })
    return
  } 

  const user:UserAttributes = {
    firstName,
    lastName,
    nickname,
    password
  }

  try {
    const response = await Users.create(user)
    if (!response) {
      res.status(500).send({ error: "Ups! User cannot be createed. Please try again later!", response: response})
      return
    }
    res.send(response)
  } catch (error:unknown) {
    let message = "Unknown error"
    if (error instanceof Error) message = error.message
    res.status(500).send({ status: 500, response: message })
  }
}

const UserController = {findAll, create}
export default UserController