import express from 'express'
import Checkin from '../controller/checkin/checkin'

const router = express.Router()

router.get('/sort', Checkin.sort)

export default router