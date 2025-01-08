import User from "../models/userModel";
import Patient from "../models/patientModel";

// Get all nurses assigned to a patient
export const getNursesByPatinet = async (req, res) => {
    try{
        const { patientId} = req.params;

        const patient = await Patient.findOne({
            where: {medicalRecordNumber: patientId},
            include: {
                model: User,
                as: 'nurses',
                attributes: ['id','name','email']
            },
        });

        if(!Patient) return res.status(400).json({message: 'Patient not found'});

        res.status(200).json(patient.nurses)
    } catch (error){
        res.status(500).json({ message: error.message });
    }  
};


// Assign Nurse to Patient
export const assignNurseToPatient = async (req, res) => {
    try {
      const { patientId } = req.params;
      const { nurseId } = req.body;
  
      // Cari pasien berdasarkan ID
      const patient = await Patient.findOne({ where: { medicalRecordNumber: patientId } });
      if (!patient) return res.status(404).json({ message: 'Patient not found' });
  
      // Cari perawat berdasarkan ID
      const nurse = await User.findOne({ where: { id: nurseId, role: 'nurse' } });
      if (!nurse) return res.status(404).json({ message: 'Nurse not found or invalid role' });
  
      // Assign nurse ke pasien
      await patient.addNurse(nurse);
  
      res.status(200).json({ message: `Nurse ${nurse.name} assigned to patient ${patient.name}` });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };