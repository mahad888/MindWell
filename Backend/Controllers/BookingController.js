import Stripe from "stripe";
import Doctor from "../Models/DoctorSchema.js";
import Patient from "../Models/PaitentSchema.js"; // Fixed typo in import
import Booking from "../Models/BookingSchema.js";
import IdempotencyKey from "../Models/IdempotencyKey.js";

export const getCheckOutSession = async (req, res) => {
  const { doctorId } = req.params;
  const { slot } = req.body; // Make sure slot contains the ID or necessary data to find it

  try {
    // Fetch doctor and patient from the database
    const doctor = await Doctor.findById(doctorId);
    const patient = await Patient.findById(req.userId);

    if (!doctor) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }
    if (!patient) {
      return res.status(404).json({ success: false, message: "Patient not found" });
    }

    // Initialize Stripe with the secret key
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    // Create a Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "pkr",
            product_data: {
              name: doctor.name,
              description: doctor.bio,
              images: [doctor.avatar.url], // Ensure avatar is properly structured
            },
            unit_amount: doctor.appointmentFee * 100, // Amount in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:5173/payment/successful?doctorId=${doctorId}&day=${slot.day}&startTime=${slot.startTime}&endTime=${slot.endTime}&_id=${slot._id}`,
      // Update with your frontend URL
      cancel_url: `${process.env.CLIENT_URL}/doctor/${doctorId}`,
      customer_email: patient.email,
      client_reference_id: doctorId,
    });

    res.status(200).json({ success: true, message: "Successfully paid", session });
  } catch (err) {
    console.error("Error creating checkout session:", err);
    res.status(500).json({ success: false, message: "Failed to create checkout session" });
  }
};


export const bookingAppointment = async (req, res) => {
  
  const {doctorId} = req.params
  const {slot} = req.body
  console.log(slot)
  try {
    const doctor = await Doctor.findById(doctorId)
    const timeSlot = doctor.timeSlots.id(slot._id); // Use Mongoose's `id` method to find the slot
    const idempotencyKey = req.headers["idempotency-key"];

    if (!idempotencyKey) {
        return res.status(400).json({ error: "Idempotency key is required" });
    }
    if (!timeSlot) {
      return res.status(404).json({ success: false, message: "Time slot not found" });

      

    }
    const existingKey = await IdempotencyKey.findOne({ key: idempotencyKey });
        if (existingKey) {
            return res.status(200).json({ message: "Duplicate request ignored" });
        }

        // Save the key to prevent duplicate processing
        await IdempotencyKey.create({ key: idempotencyKey });

    const existingBooking = await Booking.findOne({ doctorId, "timeSlot._id": slot._id });
        if (existingBooking) {
            return res.status(200).json({ message: "Booking already exists", booking: existingBooking });
        }
    const booking = new Booking({
      doctor: doctorId,
      patient: req.userId,
      ticketPrice: doctor.appointmentFee,
      isPaid: true,
      timeSlot: timeSlot,
      meetingCode: Math.random().toString(36).substring(7), // Generate a random meeting
    });
    await booking.save();
    
    if (timeSlot) {
      timeSlot.available = false; // Update the availability
      await doctor.save(); // Save the updated doctor document
    } else {
      return res.status(404).json({ success: false, message: "Time slot not found" });
    }
    console.log("Booking appointment");
    res.status(200).json({ success: true, message: "Successfully paid", booking });
  } catch (err) {
    console.error("Error creating :", err);
    res.status(500).json({ success: false, message: "Failed to create checkout session" });
  }

}


export const updateBookingStatus = async (req, res) => {
  const { appointmentId } = req.params;
  const { status } = req.body;

  try {
    
    const booking = await Booking.findByIdAndUpdate(appointmentId, { appointmentStatus: status }, { new: true });
    await booking.save();
    const doctor = await Doctor.findById(booking.doctor);
    const timeSlot = doctor.timeSlots.id(booking.timeSlot._id); 
    if (status === 'completed') {
      timeSlot.available = true; 
    } else {
      timeSlot.available = false; 
    }
    await doctor.save(); 

    res.status(200).json({ success: true, message: "Booking status updated successfully", booking });
  }
  catch (err) {
    console.error("Error updating booking status:", err);
    res.status(500).json({ success: false, message: "Failed to update booking status" });
  }
}