import { Request, Response, NextFunction } from 'express'
import { cartService } from '../services/cart'

const addItem = async (req: Request, res: Response, next: NextFunction) => {
  const itemName = decodeURIComponent(req.params.name)
  const username = res.locals.jwt.username

  cartService.addItem(itemName, username).catch(next)

  return res.status(200).json()
}

const getCart = async (req: Request, res: Response, next: NextFunction) => {
  const username = res.locals.jwt.username
  console.log(req.body);
   
  await cartService
    .getCart(username)
    .then((cart) => {
      return res.status(200).json(cart)
    })
    .catch(next)
}

const removeCartItem = async (req: Request, res: Response, next: NextFunction) => {
  const itemName = decodeURIComponent(req.params.name)
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
  const quantity = parseInt(req.params.quantity)
  const itemName = decodeURIComponent(req.params.name)
  const username = res.locals.jwt.username

  cartService
    .changeQuantity(quantity, itemName, username)
    .then(() => {
      return res.status(200).json()
    })
    .catch(next)
}

export default { addItem, getCart, removeCartItem, changeQuantity }
