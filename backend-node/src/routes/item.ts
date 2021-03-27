import express from 'express'
import controller from '../controllers/item'
import extractJWT from '../middleware/extractJWT'

const router = express.Router()

router.get('/item/:skip', controller.ItemPage)

export = router
