import { Router } from 'express'
import { getRequests, createRequest } from '../controllers/requests.controller.js'

const router = Router()

router.get('/', getRequests)
router.post('/', createRequest)

export default router
