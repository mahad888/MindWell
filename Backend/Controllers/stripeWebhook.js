import Stripe from "stripe";
import Doctor from "../Models/DoctorSchema.js";
import Booking from "../Models/BookingSchema.js";
import bodyParser from "body-parser";
import express from "express";

export const handleStripeWebhook = async (req, res) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    const sig = req.headers["stripe-signature"];
    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body,sig,process.env.STRIPE_WEBHOOK_SECRET);
        console.log("Received event:", event.type);
    } catch (err) {
        console.error("Webhook signature verification failed:", err.stack);
        return res.status(400).json({ success: false, error: "Webhook signature verification failed" });
    }

    if (event.type === "checkout.session.completed") {
        const session = event.data.object;
        console.log("Session data:", session);

        const { client_reference_id, id } = session;
        if (!client_reference_id || !session.customer_email) {
            console.error("Invalid session data");
            return res.status(400).send("Invalid session data");
        }

        try {
            const { doctorId, slot } = JSON.parse(client_reference_id);

            const doctor = await Doctor.findById(doctorId);
            if (!doctor || !doctor.timeSlots || doctor.timeSlots.length === 0) {
                console.error("Doctor or time slots not found");
                return res.status(404).send("Doctor or time slots not found");
            }

            const timeSlot = doctor.timeSlots.id(slot._id);
            if (!timeSlot) {
                console.error(`Time slot with ID ${slot._id} not found`);
                return res.status(404).send(`Time slot not found`);
            }

            const booking = new Booking({
                doctor: doctorId,
                patient: session.customer_email,
                ticketPrice: doctor.appointmentFee,
                isPaid: true,
                timeSlot: timeSlot,
                session: id,
                meetingCode: Math.random().toString(36).substring(7),
            });
            await booking.save();

            timeSlot.available = false;
            await doctor.save();

            console.log("Booking successfully created");
            res.status(200).send("Booking created");
        } catch (err) {
            console.error("Error creating booking after payment:", err.stack);
            res.status(500).send("Server error");
        }
    } else {
        console.log(`Unhandled event type: ${event.type}`);
        res.status(400).send(`Unhandled event type: ${event.type}`);
    }
};
