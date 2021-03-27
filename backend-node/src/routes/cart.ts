import express from 'express'
import controller from '../controllers/cart'
import extractJWT from '../middleware/extractJWT'

const router = express.Router()

router.post('/cart/add/:name', extractJWT, controller.addItem)
router.get('/cart', extractJWT, controller.getCart)
router.post('/cart/remove/:name', extractJWT, controller.removeCartItem)

export = router
