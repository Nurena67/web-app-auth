import Patient from '../models/patientModel.js';
import User from'../models/userModel.js'

// Get Patients
export const getPatients = async (req, res) => {
  try {
    const patients = await Patient.findAll(
      {
        include: [
          {
            model: User,
            where:{role :'doctor'} ,
            attributes: ['name'],
            as: 'doctor',
          },
          {
            model: User,
            where: { role: 'nurse' }, // Hanya ambil user dengan role nurse
            attributes: ['name'], // Ambil hanya nama perawat
            through: { attributes: [] }, // Menghilangkan atribut dari tabel pivot many-to-many
            as: 'nurses', // Alias untuk relasi nurses (many-to-many)
          },
        ],
      }
    );
    const patientsData = patients.map(patient => {
      const patientData = patient.get({ plain: true });

      patientData.doctorName = patientData.doctor ? patientData.doctor.name : null;

      patientData.nurseNames = patientData.nurses.map(nurse => nurse.name);
      
      delete patientData.doctor;
      delete patientData.nurses;

      return patientData;
    });

    console.log("All Patients Fetched:", patientsData);
    res.status(200).json(patientsData);

  } catch (err) {
    console.error("Error fetching patients:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// Get Patient By Id
export const getPatientDetail = async (req, res) => {
  try {
    const { medicalRecordNumber } = req.params;
    const patient = await Patient.findOne({
      where: { medicalRecordNumber },
    });
    
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    
    const patientData = patient.get(); 
    console.log("Patient Detail Fetched:", patientData); 

    const doctor = await User.findOne({
      where: {
        id: patientData.userId, // Asumsi userId merujuk pada ID user yang menjadi dokter
        role: 'doctor', // Pastikan hanya mencari user dengan role doctor
      },
    });

    if (doctor) {
      patientData.doctorName = doctor.name; // Menambahkan nama dokter ke dalam data pasien
    }
    
    res.json(patientData);
  } catch (err) {
    console.error("Error fetching patient detail:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// Create Patient
export const createPatient = async (req, res) => {
  try {
    const patient = await Patient.create(req.body);
    const patientData = patient.get();
    console.log("Patient Created:", patientData);
    res.status(201).json(patientData);
  } catch (err) {
    console.error("Error creating patient:", err.message);
    res.status(400).json({ error: err.message });
  }
};


// Update Patient
export const updatePatient = async (req, res) => {
  try {
    const { medicalRecordNumber } = req.params; // Mengambil ID pasien dari parameter URL

    // Cek apakah pasien dengan ID yang diberikan ada di database
    const patient = await Patient.findByPk(medicalRecordNumber);
    if (!patient) {
      console.error(`Patient with ID ${medicalRecordNumber} not found`); // Logging jika pasien tidak ditemukan
      return res.status(404).json({ error: "Patient not found" });
    }

    // Update data pasien dengan data dari body request
    await patient.update(req.body);
    const updatedPatientData = patient.get(); // Mengambil data yang telah diperbarui

    console.log("Patient Updated:", updatedPatientData); // Logging setelah update pasien
    res.status(200).json(updatedPatientData);
  } catch (err) {
    console.error("Error updating patient:", err.message); // Logging error
    res.status(400).json({ error: err.message });
  }
};


// Delete Patient
export const deletePatient = async (req, res) => {
  try {
    const { medicalRecordNumber } = req.params;
    console.log("Delete Request for MRN:", medicalRecordNumber);

    const deleted = await Patient.destroy({ where: { medicalRecordNumber } });
    if (!deleted) {
      console.log("Patient not found for deletion:", medicalRecordNumber);
      return res.status(404).json({ error: 'Patient not found' });
    }

    console.log("Patient Deleted:", medicalRecordNumber);
    res.status(200).json({ message: 'Patient deleted successfully' }); // Mengirimkan respons JSON
  } catch (err) {
    console.error("Error deleting patient:", err.message);
    res.status(500).json({ error: err.message });
  }
};


