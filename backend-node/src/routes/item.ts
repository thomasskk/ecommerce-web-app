import express from 'express'
import controller from '../controllers/item'
import extractJWT from '../middleware/extractJWT'
import { Request, Response, NextFunction } from 'express'

const router = express.Router()

router.get('/item/:skip', controller.ItemPage)

router.use((error: any, req: Request, res: Response, next: NextFunction) => {
  return res.status(401).json({ message: error.message, error })
})

export = router
