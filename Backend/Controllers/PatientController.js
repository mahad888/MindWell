import Patient from "../Schemas/PaitentSchema.js";

export const updatePatient = async (req, res) => {
    const id = req.params.id;
    const updateData = req.body;
    try{
        const updatePatient = await Patient.findByIdAndUpdate(id, updateData, {new: true});
        if(!updatePatient){
            return res.status(404).json({message: "Patient not found"});
        }
        res.status(200).json({message:'Patient updated Successfully',updatePatient});
    }
    catch(err){
        res.status(500).json({ message: 'Failed to update patient' });
    }

}

export const deletePatient = async (req, res) => {
    const id = req.params.id;
    try{
        const deletePatient = await Patient.findByIdAndDelete(id);
        if(!deletePatient){
            return res.status(404).json({message: "Patient not found"});
        }
        res.status(200).json({message:'Patient deleted Successfully'});
    }
    catch(err){
        res.status(500).json({ message: 'Failed to delete patient' });
    }

}

export const getAllPatients = async (req, res) => {
    try{
        const patients = await Patient.find({}).select('-password').select('-confirmPassword')
        res.status(200).json({patients});
    }
    catch(err){
        res.status(500).json({ message: 'Failed to get patients' });
    }

}

export const getPatient = async (req, res) => {
    const id = req.params.id;
    try{
        const patient = await Patient .findById(id);
        if(!patient){
            return res.status(404).json({message: "Patient not found"});
        }
        res.status(200).json({sucesss:true,patient});
    }
    catch(err){
        res.status(500).json({ message: 'Failed to get patient' });
    }
}