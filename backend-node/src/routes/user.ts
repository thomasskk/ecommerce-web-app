import express from 'express'
import controller from '../controllers/user'
import extractJWT from '../middleware/extractJWT'
const router = express.Router()

router.get('/user/get', controller.findUser)
router.post('/user/register', controller.register)
router.post('/user/login', controller.login)

export = router
