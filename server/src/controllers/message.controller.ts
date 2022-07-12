import { MessageAttributes } from './../../types';
import { messageFieldsValidation } from './../util/fieldsValidation.util';
import { Request, Response } from "express"
import Message from "../models/message.model"
import { setErrorMessage } from '../util/util';

const findAll = async (_req:Request, res:Response) => {
  const messages = await Message.findAll()
  res.status(201).send(messages)
}

const create = async (req: Request, res: Response) => {
  if (!messageFieldsValidation(req.body)) {
    res.status(400).send({ status: 400, error: "Fields validation faild! Messange cannot be createed. Please try again later!"})
  }

  const { senderID, receiverID, message }: MessageAttributes = req.body
  const messToCreate = {
    senderID,
    receiverID,
    message
  }

  try {
    const response = await Message.create(messToCreate)
    if (!response) {
      res.status(400).send({ status: 400, error: "Ups! Messange cannot be created. Please try again later!", response: response})
      return
    }
    res.status(201).send({ status: 201, response: response })
  } catch (error:unknown) {
    const message = setErrorMessage(error)
    res.status(501).send({ status: 501, error: message })
  }
}

//TODO: Think of Update function - necessary?

const remove = async (req: Request, res: Response) => {
  const { ID } = req.body

  if (ID == null) {
    res.status(501).send({ status: 501, error: "No ID provided. Please try again later!" })
    return
  }
  
  try {
    const response = await Message.destroy({ where: { ID: ID } })

    if (!response) {
      res.status(400).send({ status: 400, error: "Ups! Message cannot be deleted. Please try again later!" })
      return
    }

    res.status(201).send({ status: 201, response: response })
  
  }catch (error: unknown) {
    const message = setErrorMessage(error)
    res.status(501).send({ status: 501, error: message })
  }
}

const messangesController = {findAll, create, remove}
export default messangesController