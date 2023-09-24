import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'
import * as apiCtrl from '../controllers/api.js'

const router = Router()

router.get('/', apiCtrl.index)
export {
  router
}
