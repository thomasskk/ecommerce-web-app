import dotenv from 'dotenv'

dotenv.config()

const MONGO_OPTIONS = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  socketTimeoutMS: 30000,
  keepAlive: true,
  poolSize: 50,
  autoIndex: false,
  retryWrites: false,
}

const MONGO_USERNAME = process.env.MONGO_USERNAME || 'admin'
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || 'admin'
const MONGO_HOST = process.env.MONGO_URL || `cluster0.irm7e.mongodb.net/database`

const MONGO = {
  host: MONGO_HOST,
  password: MONGO_PASSWORD,
  username: MONGO_USERNAME,
  options: MONGO_OPTIONS,
  url: `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}`,
}

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost'
const SERVER_PORT = process.env.SERVER_PORT || 1500

const SERVER_TOKEN_EXPIRETIME = process.env.SERVER_TOKEN_EXPIRETIME || '10000m'
const SERVER_TOKEN_ISSUER = process.env.SERVER_TOKEN_ISSUER || 'issuer'
const SERVER_TOKEN_SECRET =
  process.env.SERVER_TOKEN_SECRET ||
  'kpxK99rEkyyVTrHBt4S8wpvGv7S8uldiEr32B8eDGn6QaujbOlwGwDxhlWYXU15'

const SERVER = {
  hostname: SERVER_HOSTNAME,
  port: SERVER_PORT,
  token: {
    expireTime: SERVER_TOKEN_EXPIRETIME,
    issuer: SERVER_TOKEN_ISSUER,
    secret: SERVER_TOKEN_SECRET,
  },
}

const config = {
  mongo: MONGO,
  server: SERVER,
}

export default config
