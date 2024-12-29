import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PatientList = () => {
    const [patients, setPatients] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const getPatients = async () => {
            try {
                const response = await axios.get("web-app-auth-production.up.railway.app/patients");
                setPatients(response.data);  // Menyimpan data ke state
            } catch (error) {
                console.error("Error get patients:", error);
            }
        }
        getPatients();
    }, []);

    const goFormAdd = (FormAddPatient) =>{
        navigate('/patients/add')
    };
    const goFormDetail = (FormAddPatient) =>{
        navigate('/patients/detail')
    };

  return (
    <div>
        <div className="container mt-5 is-centered">
        <div className="row">
            <div className="col-md-8">
            <h1 className='title'> List Data Patients </h1>
            <div>
        <button onClick={goFormAdd}
        className="button is-lg is-primary" > Add Patient </button>
        </div>
                <table className="table is-striped is-fullwidth mt-3">
                    <thead style={{ backgroundColor: '#f0f8ff' }}>
                        <tr>
                            <th>No</th>
                            <th>Nama</th>
                            <th>Umur</th>
                            <th>Keluhan</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                    {Array.isArray(patients) && patients.length > 0 ?(
                    patients.map(patient => (
                                <tr key={patient.medicalRecordNumber}>
                                    <td>{patient.medicalRecordNumber}</td>
                                    <td>{patient.name}</td>
                                    <td>{patient.age}</td>
                                    <td>{patient.complaint}</td>
                                    <td>
                                    <button  onClick={goFormDetail}
                                            className="button is-info is-small is-rounded">
                                             Detail
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
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    </div>
  )
}

export default PatientList