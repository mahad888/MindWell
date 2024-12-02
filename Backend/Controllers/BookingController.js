import Stripe from "stripe";
import Doctor from "../Models/DoctorSchema.js";
import Patient from "../Models/PaitentSchema.js"; // Fixed typo in import
import Booking from "../Models/BookingSchema.js";

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
      success_url: `http://localhost:5173/doctor/${doctorId}`, // Update with your frontend URL
      cancel_url: `${process.env.CLIENT_URL}/doctor/${doctorId}`,
      customer_email: patient.email,
      client_reference_id: doctorId,
    });

    const timeSlot = doctor.timeSlots.id(slot._id); // Use Mongoose's `id` method to find the slot

    // Create a new booking and save it to the database
    const booking = new Booking({
      doctor: doctorId,
      patient: req.userId,
      ticketPrice: doctor.appointmentFee,
      isPaid: true,
      timeSlot: timeSlot,
      session: session.id,
      meetingCode: Math.random().toString(36).substring(7), // Generate a random meeting code
    });
    await booking.save();

    // Find and update the specific time slot to mark it as unavailable
    if (timeSlot) {
      timeSlot.available = false; // Update the availability
      await doctor.save(); // Save the updated doctor document
    } else {
      return res.status(404).json({ success: false, message: "Time slot not found" });
    }
    res.status(200).json({ success: true, message: "Successfully paid", session });
  } catch (err) {
    console.error("Error creating checkout session:", err);
    res.status(500).json({ success: false, message: "Failed to create checkout session" });
  }
};


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