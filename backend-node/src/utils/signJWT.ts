import jwt from 'jsonwebtoken'
import config from '../config/config'
import logging from '../config/logging'
import { Response } from 'express'

const NAMESPACE = 'Auth'

const signJWT = (username: string, res: Response) => {
  logging.info(NAMESPACE, `Attempting to access token for ${username}`)

  try {
    jwt.sign(
      { username: username },
      config.server.token.secret,
      {
        issuer: config.server.token.issuer,
        algorithm: 'HS256',
        expiresIn: config.server.token.expireTime,
      },
      (error, token) => {
        if (error) {
          return res.status(500).json({
            message: error.message,
            error: error,
          })
        } else if (token) {
          return res.status(200).json({
            message: 'Auth successful',
            token: token,
          })
        }
      }
    )
  } catch (error) {
    logging.error(NAMESPACE, error.message, error)
  }
}

export default signJWT
