import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { UserWithPass } from '../../types/model.types';
import Users from '../models/user.model'
import { userFieldsValidation } from '../util/fieldsValidation.util';
import { setErrorMessage } from '../util/util';
// import {Op} from "sequelize"

const findAll = async (_req:Request, res:Response) => {

  const response = await Users.findAll()
  res.status(201).send(response)
}

const create = async (req: Request, res: Response) => {
  if (!userFieldsValidation(req.body)) {
    res.status(400).send({ status: 400, error: "Fields validation faild! User cannot be createed. Please try again later!"})
    return
  }
  
  const { firstName, lastName, nickname, password }: UserWithPass = req.body
  const hashPassword = await bcrypt.hash(password, 10)

  const user:UserWithPass = {
    firstName,
    lastName,
    nickname,
    password:hashPassword
  }

  try {
    const response = await Users.create(user)
    if (!response) {
      res.status(400).send({ status: 400, error: "Ups! User cannot be created. Please try again later!", response: response})
      return
    }
    res.status(201).send({ status: 201, response: response })
  } catch (error:unknown) {
    const message = setErrorMessage(error)
    res.status(501).send({ status: 501, error: message })
  }
}

const update = async (req: Request, res: Response) => {
  if (!userFieldsValidation(req.body, true)) {
    res.status(400).send({ status: 400, error: "Not valid data provided. Please try again later!"})
    return
  }

  const { ID, firstName, lastName, nickname, password }: UserWithPass = req.body
  const user:UserWithPass = {
    firstName,
    lastName,
    nickname,
    password
  }
  
  try {
    const response = await Users.update(user, { where: { ID: ID } })

    if (!response[0]) {
      res.status(401).send({ status: 401, error: "Ups! User proporities cannot be updated. Please try again later!" })
      return
    }

    res.status(201).send({ status: 201, response: response })
    
  } catch (error:unknown) {
    const message = setErrorMessage(error)
    res.status(501).send({ status: 501, error: message })
  }
}

const remove = async (req: Request, res: Response) => {
  const { ID } = req.body

  if (ID == null) {
    res.status(501).send({ status: 501, error: "No ID provided. Please try again later!" })
    return
  }
  
  try {
    const response = await Users.destroy({ where: { ID: ID } })

    if (!response) {
      res.status(401).send({ status: 401, error: "Ups! User cannot be deleted. Please try again later!" })
      return
    }

    res.status(201).send({ status: 201, response: response })
  
  }catch (error: unknown) {
    const message = setErrorMessage(error)
    res.status(501).send({ status: 501, error: message })
  }
}

const UserController = {findAll, create, update, remove}
export default UserController