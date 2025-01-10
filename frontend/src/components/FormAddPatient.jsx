import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FormAddPatient = () => {
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [nurses, setNurses] = useState([]);
  const [selectedNurses, setSelectedNurses] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    bloodGroup: '',
    complaint: '',
    medicalHistory: '',
    userId: '',
    familyName: '',
  });

  useEffect(() => {
    const getDoctors = async () => {
      try {
        // const token = localStorage.getItem('token');
        const response = await axios.get("https://web-app-auth.up.railway.app/doctor");
        setDoctors(response.data);
      } catch (error) {
        console.error("Gagal Mendapatkan Data:", error);
      }
    };

    const getNurses = async () => {
      try {
        const response = await axios.get("https://web-app-auth.up.railway.app/nurses");
        setNurses(response.data);
      } catch (error) {
        console.error("Gagal Mendapatkan Data Perawat:", error);
      }
    };

    getDoctors();
    getNurses();
  }, []);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Tidak ada token, Harap Login.!!');
        }

        const patientResponse = await axios.post("https://web-app-auth.up.railway.app/patients",formData,
        { headers:{
            Authorization: `Bearer ${token}`,
          }, withCredentials: true
        });

        const patientId = patientResponse.data.medicalRecordNumber;

        if (selectedNurses.length > 0) {
          await axios.post(
            `https://web-app-auth.up.railway.app/patients/${patientId}/assign-nurse`,
            { nurseIds: selectedNurses },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
              },
            }
          );
        }
        
          alert('Pasein Berhasil diTambahkan!');
          navigate("/patients");
        } catch (error) {
        if (error.response) {
        setMsg(error.response.data.msg);
    }
  };
};

const back = () => {
    navigate('/patients');
  }
  
  return (
  <div className="container mt-5 is-centered">
    <div className="colums is-half">
      <h1 className="title">Form New Patient</h1>
      <form onSubmit={handleSubmit}>
      <div className="field">
                <label className="label">Nama Lengkap</label>
                <div className="control">
                    <input
                        className="input"
                        type="text"
                        placeholder="Nama Lengkap"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                    />
                </div>
            </div>

            <div className="field">
                <label className="label">Umur</label>
                <div className="control">
                    <input
                        className="input"
                        type="number"
                        placeholder="Umur"
                        value={formData.age}
                        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                        required
                        min={1}
                    />
                </div>
            </div>

            <div className="field">
                <label className="label">Jenis Kelamin</label>
                <div className="control">
                    <div className="select">
                        <select 
                        value={formData.gender}
                        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                        required
                        >
                            <option value="">Pilih Jenis Kelamin</option>
                            <option value="Laki-laki">Laki-laki</option>
                            <option value="Perempuan">Perempuan</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="field">
            <label className="label">Pilih Dokter</label>
            <div className="control">
              <div className="select">
                <select
                value={formData.userId}
                onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
                required
                >
                  <option value="">Pilih Dokter</option>
                  {doctors.map((doctor) => (
                    <option key={doctor.id} value={doctor.id}>
                      {doctor.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="field">
            <label className="label">Pilih Perawat</label>
            <div className="control">
              <div className="select is-multiple">
                <select
                  multiple
                  value={selectedNurses}
                  onChange={(e) =>
                    setSelectedNurses(
                      Array.from(e.target.selectedOptions, (option) => option.value)
                    )
                  }
                >
                  {nurses.map((nurse) => (
                    <option key={nurse.id} value={nurse.id}>
                      {nurse.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

            <div className="field">
                <label className="label">Keluhan</label>
                <div className="control">
                    <textarea
                        className="textarea"
                        placeholder="Masukkan Keluhan Anda Di sini"
                        value={formData.complaint}
                        onChange={(e) => setFormData({ ...formData, complaint: e.target.value })}
                        required
                    />
                </div>
            </div>

            <div className="field">
                <label className="label">Riwayat Penyakit</label>
                <div className="control">
                    <textarea
                        className="textarea"
                        placeholder="Masukkan Riwayat Penyakit Anda Jika Ada"
                        value={formData.medicalHistory}
                        onChange={(e) => setFormData({ ...formData, medicalHistory: e.target.value })}
                    />
                </div>
            </div>

            <div className="field">
                <label className="label">Golongan Darah</label>
                <div className="control">
                    <div className="select">
                        <select 
                        value={formData.bloodGroup}
                        onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                        required
                        >
                            <option value="">Pilih Golongan Darah Anda</option>
                            <option value="A">A</option>
                            <option value="AB">AB</option>
                            <option value="B">B</option>
                            <option value="o">O</option>
                            <option value="Tidak Tahu"> Tidak Tahu </option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="field">
                <label className="label">Nama Keluarga</label>
                <div className="control">
                    <input
                        className="input"
                        type="text"
                        placeholder="Nama Keluarga"
                        value={formData.familyName}
                        onChange={(e) => setFormData({ ...formData, familyName: e.target.value })}
                        required
                    />
                </div>
            </div>

            <div className="field is-grouped mb-6">
                <div className="control">
                    <button className="button is-link" type="submit">
                        Save
                    </button>
                </div>
                <div className="control">
                    <button onClick={back} className="button is-link is-light" type="button">
                        Cancel
                    </button>
                </div>
            </div>
        </form>
    </div>
    </div>
  )
}

export default FormAddPatient