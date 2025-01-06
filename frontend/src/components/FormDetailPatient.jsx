import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import "bulma/css/bulma.css"

const FormDetailPatient = () => {
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    const getPatients = async () => {
      try {
          const token = localStorage.getItem('token');
          if (!token) {
              throw new Error('Tidak ada token, Harap Login.!!');
          }
          const response = await axios.get("https://web-app-auth.up.railway.app/patients", {
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
  getPatients();
  }, [navigate]);

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
        {Array.isArray(patients) && patients.length > 0 ?(
            patients.map(patient => (
            <tr key={patient.medicalRecordNumber}>
              <td>{patient.medicalRecordNumber}</td>
              <td>{patient.name}</td>
              <td>{patient.age}</td>
              <td>{patient.gender}</td>
              <td>{patient.doctorName || 'Tidak Diketahui'}</td>
              <td>{patient.complaint}</td>
              <td>{patient.medicalHistory}</td>
              <td>{patient.bloodGroup}</td>
              <td>{patient.familyName}</td>
              <td>
                <button
                  onClick={() => goEdit(patient.medicalRecordNumber)}
                  className="button is-small is-info">
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(patient.medicalRecordNumber)}
                  className="button is-small is-danger ml-2">
                  Delete
                </button>
              </td>
            </tr>
            ))
        ) : (
            <tr>
                <td colSpan="5" style={{ textAlign: 'center' }}>
                    No data available.
                </td>
            </tr>
        )}
        <div>
        <Link to={'/patients'} className='button is-small is-primary' > Kembali </Link>
        </div>
        </tbody>
      </table>
    </div>
  )
}

export default FormDetailPatient