import Doctor from "../Schemas/DoctorSchema.js";

export const updateDoctor = async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;
  try {
    const updateDoctor = await Doctor.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updateDoctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res
      .status(200)
      .json({ message: "Doctor updated Successfully", updateDoctor });
  } catch (err) {
    res.status(500).json({ message: "Failed to update Doctor" });
  }
};

export const deleteDoctor = async (req, res) => {
  const id = req.params.id;
  try {
    const deleteDoctor = await Doctor.findByIdAndDelete(id);
    if (!deleteDoctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.status(200).json({ message: "Doctor deleted Successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete Doctor" });
  }
};

export const getAllDoctors = async (req, res) => {
  try {
    const { query } = req.query;
    let doctors;
    if (query) {
      doctors = await Doctor.find({
        isApproved: "approved",
        $or: [
          { name: { $regex: query, $options: "i" } },
          { specialization: { $regex: query, $options: "i" } },
          { experiences: { $regex: query, $options: "i" } },
          { apppointmentFee: { $regex: query, $options: "i" } },
          { qualifications: { $regex: query, $options: "i" } },
        ],
      }).select("-password").select("-confirmPassword");
    }
    const Doctors = await Doctor.find({isApproved:'approved'},)
      .select("-password")
      .select("-confirmPassword");
    res.status(200).json({ Doctors });
  } catch (err) {
    res.status(500).json({ message: "Failed to get Doctors" });
  }
};

export const getDoctor = async (req, res) => {
  const id = req.params.id;
  try {
    const doctor = await Doctor.findById(id);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.status(200).json({ sucesss: true, Doctor: doctor});
  } catch (err) {
    res.status(500).json({ message: "Failed to get Doctor" });
  }
};
