import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'
import * as recipesCtrl from '../controllers/profiles.js'

const router = Router()

router.get('/', recipesCtrl.index)

export {
  router
}
