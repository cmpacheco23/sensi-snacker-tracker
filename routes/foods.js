import { Router } from 'express'
import * as foodsCtrl from '../controllers/foods.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

//routers:

router.get('/', foodsCtrl.index)
router.get('/:foodId', foodsCtrl.show)
router.get('/:foodId/edit', isLoggedIn, foodsCtrl.edit)
router.post('/', isLoggedIn, foodsCtrl.create)
router.post('/:foodId/reactions', isLoggedIn, foodsCtrl.createReaction)
router.post('/:foodId/add-to-profile', isLoggedIn, foodsCtrl.addToProfile)
router.delete('/:foodId', isLoggedIn, foodsCtrl.delete)
router.delete('/:foodId/reactions/:reactionId', isLoggedIn, foodsCtrl.deleteReaction)
router.put('/:foodId', foodsCtrl.update)

export {
  router
}