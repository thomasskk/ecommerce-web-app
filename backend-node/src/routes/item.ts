import express, { NextFunction, Request, Response } from 'express'
import controller from '../controllers/item'

const router = express.Router()

router.get('/item/page/', controller.ItemPage)
router.get('/item/get/', controller.getItem)

router.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.log(error.message)

  return res.status(401).json({ message: error.message, error })
})

export = router
