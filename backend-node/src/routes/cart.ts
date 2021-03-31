import express from 'express'
import controller from '../controllers/cart'
import extractJWT from '../middleware/extractJWT'
import { Request, Response, NextFunction } from 'express'

const router = express.Router()

router.post('/cart/add/', extractJWT, controller.addItem)
router.get('/cart', extractJWT, controller.getCart)
router.post('/cart/remove/', extractJWT, controller.removeCartItem)
router.post('/cart/quantity/', extractJWT, controller.changeQuantity)

router.use((error: any, req: Request, res: Response, next: NextFunction) => {
  return res.status(401).json({ message: error.message, error })
})

export = router
