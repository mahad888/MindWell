import express from 'express'
import { authenticate } from '../Authentications/verifyToken.js'
import { getCheckOutSession, updateBookingStatus } from '../Controllers/BookingController.js'
const router = express.Router()

router.post('/checkout-session/:doctorId',authenticate,getCheckOutSession)
router.put('/update-booking-status/:appointmentId',authenticate,updateBookingStatus)

export default router