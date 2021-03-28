import { Request, Response, NextFunction } from 'express'
import { User } from '../models/user'
import bcryptjs from 'bcryptjs'
import signJWT from '../utils/signJWT'
import logging from '../config/logging'

const login = async (req: Request, res: Response) => {
  let { username, password } = req.body

  try {
    let data = await User.findOne({ username }).exec()

    if (!data) {
      return res.status(401).json({
        message: 'Username or password doesnt exist',
      })
    }

    if (bcryptjs.compareSync(password, data!.password)) {
      signJWT(data!.username, res)
    } else {
      return res.status(401).json({
        message: 'Password Mismatch',
      })
    }
  } catch (error) {
    return res.json({ message: error.message, error }).status(500)
  }
}
    
const register = async (req: Request, res: Response) => {
  if (req.body.username === req.body.password) {
    return res.status(500).json({ message: 'The username and the password cant be the same' })
  }

  let passwordHash = bcryptjs.hashSync(req.body.password, 10)
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    gender: req.body.gender,
    username: req.body.username,
    password: passwordHash,
    email: req.body.email,
    adress: req.body.adress,
    phone: req.body.phone,
    birthDate: req.body.birthDate,
  })

  try {
    await user.save()
    signJWT(user.username, res)
  } catch (error) {
    return res.status(500).json({ message: error.message, error })
  }
}

const findUser = async (req: Request, res: Response) => {
  let { username } = req.body

  try {
    let data = await User.findOne({ username }).exec()

    return res.status(200).json({
      data,
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error,
    })
  }
}

export default { findUser, register, login }
