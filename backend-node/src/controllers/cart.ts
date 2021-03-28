import { Request, Response, NextFunction } from 'express'
import { Item } from '../models/item'
import { User, UserProps, UserDoc } from '../models/user'
import { Type } from 'ts-mongoose'
import 'ts-mongoose/plugin'
import { ObjectId } from 'mongodb'

const addItem = async (req: Request, res: Response) => {
  try {
    const name = decodeURIComponent(req.params.name)
    const username = res.locals.jwt.username

    let user = await User.findOne({ username }).exec()
    let item = await Item.findOne({ name }).exec()
    let itemIndex = -1

    for (const [i, v] of user!.cart!.entries()) {
      if (v.item!.toString() == item!._id) {
        itemIndex = i
      }
    }

    if (itemIndex === -1) {
      user!.cart!.push({
        item: item!._id,
        quantity: 1,
      })
    } else {
      user!.cart![itemIndex].quantity++
    }
    await user!.populate({ path: 'cart.item', model: 'Item' }).execPopulate()

    await user!.save()
    return res.status(200).json(user!.cart!)
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error,
    })
  }
}

const getCart = async (req: Request, res: Response) => {
  try {
    const username = res.locals.jwt.username
    let user = await User.findOne({ username }).exec()

    await user!.populate({ path: 'cart.item', model: 'Item' }).execPopulate()
    return res.status(200).json(user!.cart!)
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error,
    })
  }
}

const removeCartItem = async (req: Request, res: Response) => {
  try {
    const itemName = decodeURIComponent(req.params.name)
    const username = res.locals.jwt.username
    let user = await User.findOne({ username }).exec()

    await user!.populate({ path: 'cart.item', model: 'Item' }).execPopulate()

    user!.cart! = user!.cart!.filter((item: any) => item!.item!.name != itemName)

    await user!.save()
    return res.status(200).json(user!.cart!)
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error,
    })
  }
}

const changeQuantity = async (req: Request, res: Response) => {
  try {
    const quantity = parseInt(req.params.quantity)
    const itemName = decodeURIComponent(req.params.name)

    const username = res.locals.jwt.username
    let user = await User.findOne({ username }).exec()
    await user!.populate({ path: 'cart.item', model: 'Item' }).execPopulate()

    let index = user!.cart!.findIndex((item: any) => item!.item!.name === itemName)

    user!.cart![index].quantity = quantity

    await user!.save()
    return res.status(200).json(user!.cart!)
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error,
    })
  }
}

export default { addItem, getCart, removeCartItem, changeQuantity }
