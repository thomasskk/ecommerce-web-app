import { Request, Response, NextFunction } from 'express'
import { Item } from '../models/item'

const createItem = async (req: Request, res: Response) => {
  const item = new Item({
    name: req.body.name,
    price: req.body.price,
    image: req.body.stock,
    stock: req.body.stock,
    category: req.body.category,
    description: req.body.description,
  })

  try {
    await item.save()
    return res.json({ item }).status(201)
  } catch (error) {
    return res.json({ message: error.message, error }).status(500)
  }
}

const ItemPage = async (req: Request, res: Response) => {
  const LIMIT = 20

  const skip = parseInt(req.params.skip)

  try {
    const item = await Item.find({})
      .skip(skip * LIMIT)
      .limit(LIMIT)
    return res.status(200).json(item)
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error,
    })
  }
}

export default { createItem, ItemPage }
