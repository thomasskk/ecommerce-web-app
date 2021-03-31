import { Request, Response, NextFunction } from 'express'
import { cartService } from '../services/cart'

const addItem = async (req: Request, res: Response, next: NextFunction) => {
  const itemName = String(req.query.name)
  const username = res.locals.jwt.username

  cartService
    .addItem(itemName, username)
    .then(() => {
      return res.status(200).json()
    })
    .catch(next)
}

const getCart = async (req: Request, res: Response, next: NextFunction) => {
  const username = res.locals.jwt.username
  await cartService
    .getCart(username)
    .then((cart) => {
      return res.status(200).json(cart)
    })
    .catch(next)
}

const removeCartItem = async (req: Request, res: Response, next: NextFunction) => {
  const itemName = String(req.query.name)
  const username = res.locals.jwt.username
  console.log(itemName);
  

  cartService
    .removeCartItem(itemName, username)
    .then(() => {
      return res.status(200).json()
    })
    .catch(next)
}

const changeQuantity = async (req: Request, res: Response, next: NextFunction) => {
  const quantity = Number(req.query.quantity)
  const itemName = String(req.query.name)
  const username = res.locals.jwt.username

  cartService
    .changeQuantity(quantity, itemName, username)
    .then(() => {
      return res.status(200).json()
    })
    .catch(next)
}

export default { addItem, getCart, removeCartItem, changeQuantity }
