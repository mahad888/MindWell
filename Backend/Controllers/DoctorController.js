import Doctor from "../Models/DoctorSchema.js";
import { uploadFilesToCloudinary } from "../utils/features.js";
import bcrypt from "bcrypt";

export const updateDoctor = async (req, res) => {
  const updateData = req.body;
  const file = req.file;
  console.log(file)
 

  try {

    if (file) {
      const result = await uploadFilesToCloudinary([file]);
      if (!result || !result[0] || !result[0].public_id || !result[0].url) {
        return res.status(500).json({ status: false, message: "Failed to upload avatar" });
      }
      console.log(
        result)
      updateData.avatar = {
        public_id: result[0].public_id,
        url: result[0].url,
      };
    }
  
    const updateDoctor = await Doctor.findByIdAndUpdate(req.userId, updateData, {
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
    console.log(err)
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
    const { query, page = 1, limit = 10, sortBy = 'name', sortOrder = 'asc' } = req.query;

    // Create search filter object
    let searchFilter = { isApproved: "approved" };

    if (query) {
      searchFilter.$or = [
        { name: { $regex: query, $options: "i" } },
        { specialization: { $regex: query, $options: "i" } },
        { experiences: { $regex: query, $options: "i" } },
        { qualifications: { $regex: query, $options: "i" } },
      ];

      // Add appointmentFee as a condition only if the query is a number
      if (!isNaN(query)) {
        searchFilter.$or.push({ appointmentFee: query });
      }
    }

    // Sorting options (default is by name, ascending)
    const sortOptions = {
      [sortBy]: sortOrder === 'desc' ? -1 : 1,
    };

    // Pagination logic
    const skip = (page - 1) * limit;

    // Query the database with filter, sort, pagination, and projection (excluding password)
    const doctors = await Doctor.find(searchFilter)
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit))
      .select("-password");
      console.log(doctors)

    // Count total doctors for pagination
    const totalDoctors = await Doctor.countDocuments(searchFilter);

    // Return the doctors with pagination info
    res.status(200).json({
      doctors,
      currentPage: page,
      totalPages: Math.ceil(totalDoctors / limit),
      totalDoctors,
    });

  } catch (err) {
    console.error('Error fetching doctors:', err.message, err.stack);
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

export const getDoctorProfile = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.userId).select("-password");
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    const appointments = await Booking.find({ doctor: req.userId }).populate(
      "user",
      "name avatar"
    ); 


    res.status(200).json({ sucesss: true, Doctor: doctor ,appointments});
  } catch (err) {
    res.status(500).json({ message: "Failed to get Doctor" });
  }
}
