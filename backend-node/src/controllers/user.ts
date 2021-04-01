import { NextFunction, Request, Response } from 'express'
import { userService } from '../services/user'

const login = async (req: Request, res: Response, next: NextFunction) => {
  let { username, password } = req.body
  await userService
    .login(username, password)
    .then((token) => {
      return res.status(200).json({
        message: 'Auth successful',
        token: token,
      })
    })
    .catch(next)
}

const register = async (req: Request, res: Response, next: NextFunction) => {
  const userData = req.body
  const token = await userService
    .register(userData)
    .then((token) => {
      return res.status(200).json({
        message: 'Auth successful',
        token: token,
      })
    })
    .catch(next)
}

const findUser = async (req: Request, res: Response, next: NextFunction) => {
  const username = req.body
  await userService
    .findUser(username)
    .then((data) => {
      return res.status(200).json(data)
    })
    .catch(next)
}

export default { findUser, register, login }
