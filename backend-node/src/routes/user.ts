import express, { NextFunction, Request, Response } from 'express'
import controller from '../controllers/user'

const router = express.Router()

router.get('/user/get', controller.findUser)
router.post('/user/register', controller.register)
router.post('/user/login', controller.login)

router.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.log(error.message)

  return res.status(401).json({ message: error.message, error })
})

export = router
