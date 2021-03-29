import jwt from 'jsonwebtoken'
import config from '../config/config'
import logging from '../config/logging'
import { Response } from 'express'

const signJWT = (username: string) => {
  return jwt.sign({ username: username }, config.server.token.secret, {
    issuer: config.server.token.issuer,
    algorithm: 'HS256',
    expiresIn: config.server.token.expireTime,
  })
}

export default signJWT
