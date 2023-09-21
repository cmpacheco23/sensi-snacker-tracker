import { Router } from 'express'
import * as foodsCtrl from '../controllers/foods.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

//routers:

router.get('/', foodsCtrl.index)

export {
  router
}