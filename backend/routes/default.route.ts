import { Router } from 'express'
import { defaultController } from '../controllers'
import { authMiddleware } from '../helpers'

const router = Router()

router.get("/", defaultController.get())

router.get(
  "/secret",
  authMiddleware,
  defaultController.secret()
)

export default router
