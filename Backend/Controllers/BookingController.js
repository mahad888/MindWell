import Stripe from "stripe";
import Doctor from "../Models/DoctorSchema.js";
import Patient from "../Models/PaitentSchema.js";
import Booking from "../Models/BookingSchema.js";



export const getCheckOutSession = async (req, res) => {

    const { doctorId } = req.params;
    try{
    const doctor = await Doctor.findById(doctorId);
    const patient = await Patient.findById(req.userId);
    if (!doctor) {
        return res.status(404).json({ success: false, message: "Doctor not found" });
    }
    if (!patient) {
        return res.status(404).json({ success: false, message: "Patient not found" });
    }
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
        {
            price_data: {
            currency: 'pkr',
            product_data: {
                name: doctor.name,
                description: doctor.bio,
                images: [doctor.avatar.url],
            },
            unit_amount: doctor.apppointmentFee * 100,
            },
            quantity: 1,
        },
        ],
        mode: 'payment',
        success_url: `${process.env.CLIENT_URL}/checkout-success`,
        cancel_url: `${process.env.CLIENT_URL}/doctor/${doctorId}`,
        customer_email: patient.email,
        client_reference_id: doctorId,

    });

    const booking = new Booking({
        doctor: doctorId,
        patient: req.userId,
        ticketPrice: doctor.apppointmentFee,
        session: session.id,
    });
    await booking.save();   
    
    res.status(200).json({ success: true, message:"Successfully paid",session });
    }

catch (err) {
    console.error("Error creating checkout session:", err);
    res.status(500).json({ success: false, message: "Failed to create checkout session" });
}

}


  