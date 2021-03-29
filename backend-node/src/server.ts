import http from 'http'
import express from 'express'
import logging from './config/logging'
import config from './config/config'
import userRoutes from './routes/user'
import itemRoutes from './routes/item'
import cartRoutes from './routes/cart'
import { Request, Response, NextFunction } from 'express'
import fs from 'fs'
import mongoose from 'mongoose'
import path from 'path'
import cors from 'cors'

const NAMESPACE = 'Server'
const router = express()

const connect = async () => {
  try {
    await mongoose.connect(config.mongo.url, config.mongo.options)
    logging.info(NAMESPACE, 'Mongo Connected')
  } catch (error) {
    logging.error(NAMESPACE, error.message, error)
  }
}
connect()


router.use((req, res, next) => {
  logging.info(
    NAMESPACE,
    `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}] `
  )

  res.on('finish', () => {
    logging.info(
      NAMESPACE,
      `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS [${res.statusCode}]`
    )
  })
  next()
})

router.use(express.urlencoded({ extended: false }))
router.use(express.json())

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )

  if (req.method == 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'POST, GET')
    return res.status(200).json({})
  }
  next()
})

router.use('/', userRoutes, itemRoutes, cartRoutes)

router.use((req: Request, res: Response, next: NextFunction) => {
  const error = new Error('not found')
  return res.status(404).json({ message: error.message })
})

var options = {
  key: fs.readFileSync('src/server.key'),
  cert: fs.readFileSync('src/server.cert'),
}

const httpServer = http.createServer( router)
httpServer.listen(config.server.port, () =>
  logging.info(NAMESPACE, `Server runnning on ${config.server.hostname}:${config.server.port}`)
)
