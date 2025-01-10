import User from "../models/userModel.js";
import Patient from "../models/patientModel.js";

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

        if(!patient) return res.status(400).json({message: 'Patient not found'});

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

  // Get all patients assigned to a nurse
export const getPatientsByNurse = async (req, res) => {
    try {
      const { nurseId } = req.params;
  
      // Cari perawat berdasarkan ID dan include pasien yang dirawat
      const nurse = await User.findByPk(nurseId, {
        include: {
          model: Patient,
          as: 'patients',
          attributes: ['medicalRecordNumber', 'name', 'age', 'gender'],
        },
      });
  
      if (!nurse) return res.status(404).json({ message: 'Nurse not found' });
  
      res.status(200).json(nurse.patients);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


// Remove nurse from patient
export const removeNurseFromPatient = async (req, res) => {
    try {
      const { patientId } = req.params;
      const { nurseId } = req.body;

      console.log(`Patient ID: ${patientId}`);
      console.log(`Nurse ID: ${nurseId}`);
  
      // Cari pasien dan perawat
      const patient = await Patient.findOne({
        where : { medicalRecordNumber : patientId}
      });

      const nurse = await User.findOne({
        where : { id: nurseId, role: 'nurse'}
      });
  
      if (!patient || !nurse) return res.status(404).json({ message: 'Patient or Nurse not found' });
  
      // Hapus relasi
      await patient.removeNurse(nurse);
  
      res.status(200).json({ message: `Nurse ${nurse.name} removed from patient ${patient.name}` });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


//Get All Nurse
export const getAllNurses = async (req,res) => {
    try {
    const nurses = await User.findAll({
      where: { role: 'nurse' },
      attributes: ['id','name','email','role']
    });

    if(nurses.length === 0){
      return res.status(404).json({msg: 'Data Perawat Kosong'});
    }

    res.status(200).json(nurses);
  } catch (error) {
    res.status(500).json({msg: error.message}); 
  }
};