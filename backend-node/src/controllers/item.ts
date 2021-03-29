import { Request, Response, NextFunction } from 'express'
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
  const skip = parseInt(req.params.skip)
  await itemService
    .ItemPage(skip)
    .then((item) => {
      return res.status(200).json(item)
    })
    .catch(next)
}

export default { createItem, ItemPage }
