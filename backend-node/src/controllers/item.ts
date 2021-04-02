import { NextFunction, Request, Response } from 'express'
import { itemService } from '../services/item'

const createItem = async (req: Request, res: Response, next: NextFunction) => {
  await itemService
    .createItem(req.body)
    .then((item) => {
      return res.json({ item }).status(201)
    })
    .catch(next)
}

const ItemPage = async (req: Request, res: Response, next: NextFunction) => {
  const input = String(req.query.input)
  const skip = Number(req.query.skip)

  await itemService
    .itemPage(skip, input)
    .then((itemCount) => {
      return res.status(200).json(itemCount)
    })
    .catch(next)
}

const getItem = async (req: Request, res: Response, next: NextFunction) => {
  const itemName = String(req.query.name)

  await itemService
    .getItem(itemName)
    .then((item) => {
      return res.status(200).json(item)
    })
    .catch(next)
}

export default { createItem, ItemPage, getItem }
