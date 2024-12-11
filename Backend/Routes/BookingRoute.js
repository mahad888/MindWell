import express from 'express'
import { authenticate } from '../Authentications/verifyToken.js'
import { bookingAppointment, getCheckOutSession, updateBookingStatus } from '../Controllers/BookingController.js'
import { handleStripeWebhook } from '../Controllers/stripeWebhook.js'
import bodyParser from "body-parser";

const router = express.Router()

router.post('/checkout-session/:doctorId',authenticate,getCheckOutSession)
router.put('/update-booking-status/:appointmentId',authenticate,updateBookingStatus)
router.post('/booking/appointment/:doctorId',authenticate, bookingAppointment)
// router.post("/webhook",bodyParser.raw({ type: "application/json" }), handleStripeWebhook);

export default router