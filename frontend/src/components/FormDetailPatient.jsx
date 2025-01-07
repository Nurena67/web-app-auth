import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link , useParams} from 'react-router-dom';
import "bulma/css/bulma.css"

const FormDetailPatient = () => {
  const [patients, setPatients] = useState(null);
  const { medicalRecordNumber} = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    const getPatientsByid = async () => {
      try {
          const token = localStorage.getItem('token');
          if (!token) {
              throw new Error('Tidak ada token, Harap Login.!!');
          }
          const response = await axios.get(`https://web-app-auth.up.railway.app/patients/${medicalRecordNumber}`, {
              headers: {
                  Authorization: `Bearer ${token}`,
              },withCredentials: true
          });
          setPatients(response.data);
      } catch (error) {
          console.error("Error get patients:", error);
          if (error.response && error.response.status === 401) {
              navigate('/login');
          }
      }
    };

  getPatientsByid();
  },[medicalRecordNumber, navigate]);

  const handleDelete = async (medicalRecordNumber) => {
    try {
      const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Tidak ada token, Harap Login.!!');
        }
      await axios.delete(`https://web-app-auth.up.railway.app/patients/${medicalRecordNumber}`,{
        headers:{
          Authorization: `Bearer ${token}`
        }, withCredentials: true
      });
      setPatients(patients.filter(patient => patient.medicalRecordNumber !== medicalRecordNumber));
      alert("Pasien berhasil dihapus");
      navigate('/patients');
      } catch (error) {
        console.error("Error deleting patient:", error);
        alert("Gagal menghapus pasien");
        if (error.response && error.response.status === 401) {
                navigate('/login');
            } else {
                alert('Failed to delete the patient. Please try again.');
            }
      }
    };
    
    const goEdit = (medicalRecordNumber) => {
      navigate(`/patients/edit/${medicalRecordNumber}`);
    };

    if (!patients) {
      return <div>Loading...</div>;
    }
  return (
    <div className="container mt-5 is-centered">
      <h1 className="title">Detail Pasien</h1>
      <table className="table is-fullwidth is-striped">
        <thead style={{ backgroundColor: '#f5f5f5', color: '#363636' }}>
          <tr>
            <th>No</th>
            <th>Nama</th>
            <th>Umur</th>
            <th>Jenis Kelamin</th>
            <th>Dokter</th>
            <th>Keluhan</th>
            <th>Riwayat Penyakit</th>
            <th>Golongan Darah</th>
            <th>Nama Keluarga</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody style={{ backgroundColor: '#f0f8ff' }}>
            <tr key={patients.medicalRecordNumber}>
              <td>{patients.medicalRecordNumber}</td>
              <td>{patients.name}</td>
              <td>{patients.age}</td>
              <td>{patients.gender}</td>
              <td>{patients.doctorName || 'Tidak Diketahui'}</td>
              <td>{patients.complaint}</td>
              <td>{patients.medicalHistory}</td>
              <td>{patients.bloodGroup}</td>
              <td>{patients.familyName}</td>
              <td>
                <button
                  onClick={() => goEdit(patients.medicalRecordNumber)}
                  className="button is-small is-info">
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(patients.medicalRecordNumber)}
                  className="button is-small is-danger ml-2">
                  Delete
                </button>
              </td>
            </tr>
            ))}
        </tbody>
      </table>
        <div>
        <Link to={'/patients'} className='button is-small is-primary' > Kembali </Link>
        </div>
    </div>
  )
}

export default FormDetailPatient