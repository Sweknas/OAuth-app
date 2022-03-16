import { Router } from 'express'
import { userController } from '../controllers'

const router = Router()

router.post("/register", userController.create())

router.post("/login", userController.auth())

router.post("/refresh", userController.refresh())

export default router
