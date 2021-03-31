import bcryptjs from 'bcryptjs'
import signJWT from '../utils/signJWT'
import logging from '../config/logging'
import { User } from '../models/user'
import { Response } from 'express'

export class userService {
  static login = async (username: string, password: string) => {
    let data = await User.findOne({ username }).exec()

    if (!data) {
      throw { message: 'Username or password doesnt exist' }
    }

    if (!bcryptjs.compareSync(password, data!.password)) {
      throw { message: 'Password Mismatch' }
    }

    return signJWT(username)
  }

  static register = async (userData: any) => {
    throw (
      userData.username === userData.password && {
        message: 'The username and the password cant be the same',
      }
    )

    const passwordHash = bcryptjs.hashSync(userData.password, 10)
    const user = new User({
      firstName: userData.firstName,
      lastName: userData.lastName,
      gender: userData.gender,
      username: userData.username,
      password: passwordHash,
      email: userData.email,
      adress: userData.adress,
      phone: userData.phone,
      birthDate: userData.birthDate,
    })
    await user.save()
    return signJWT(userData.username)
  }

  static findUser = (username: string) => {
    return User.findOne({ username }).exec()
  }
}
