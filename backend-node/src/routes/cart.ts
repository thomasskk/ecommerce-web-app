import express from 'express'
import controller from '../controllers/cart'
import extractJWT from '../middleware/extractJWT'
import { Request, Response, NextFunction } from 'express'

const router = express.Router()

router.post('/cart/add/:name', extractJWT, controller.addItem)
router.get('/cart', extractJWT, controller.getCart)
router.post('/cart/remove/:name', extractJWT, controller.removeCartItem)
router.post('/cart/:quantity/:name', extractJWT, controller.changeQuantity)

router.use((error: any, req: Request, res: Response, next: NextFunction) => {
  return res.status(401).json({ message: error.message, error })
})

export = router
