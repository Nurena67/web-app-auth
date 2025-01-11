import React, {useState, useEffect} from "react";
import { useNavigate, useParams} from "react-router-dom";
import axios from "axios";

const FormEditPatient = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [nurses, setNurses] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    bloodGroup: '',
    complaint: '',
    medicalHistory: '',
    userId:'',
    nurseIds: [],
    familyName: '',
  });
  
  useEffect(() => {
    const getPatientsByid = async () => {
      
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`https://web-app-auth.up.railway.app/patients/${id}`, 
        { headers: 
          { Authorization: `Bearer ${token}` } ,
          withCredentials: true
        }
      );
      const patient = response.data;
      setFormData(
        {
          name: patient.name,
          age: patient.age,
          gender: patient.gender,
          bloodGroup: patient.bloodGroup,
          complaint: patient.complaint,
          medicalHistory: patient.medicalHistory,
          userId: patient.userId,
          nurseIds: patient.nurses.map(nurse => nurse.id),
          familyName: patient.familyName,
        }
      );
      } catch (error) {
        console.error("Error get patients:", error);
      }
    };

    const getDoctors = async () => {
      
      try {
        const response = await axios.get("https://web-app-auth.up.railway.app/doctor");
        setDoctors(response.data);

      } catch (error) {
        console.error("Gagal Mendapatkan Data Dokter:", error);
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
    
    getPatientsByid();
    getDoctors();
    getNurses();
  }, [id]);

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if(!token) {
        throw new Error('Tidak ada Token, Harap Login!!..')
      };

    await axios.put(`https://web-app-auth.up.railway.app/patients/${id}`, 
    formData , 
      { 
        headers: { 
          Authorization: `Bearer ${token}` },
          withCredentials: true
      }
    );

    await axios.put(
      `https://web-app-auth.up.railway.app/patients/${id}/update-nurses`,
      { nurseIds: formData.nurseIds },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    alert('Pasien Berhasil di Update');
    navigate('/patients')

    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg || "Terjadi kesalahan, silakan coba lagi!");
      } else {
        setMsg("Tidak dapat terhubung ke server.");
      }
  };
  };

  const handleNurseChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions);
    const nurseIds = selectedOptions.map((option) => option.value)
    setFormData({ ...formData, nurseIds});
  };
  
  const backDetail = () => {
    navigate('/patients');
  }
  return (
  <div className="container mt-5 is-centered">
    <div className="colums is-half">
      <h1 className="title">Form Edit Patient</h1>
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
                  value={formData.nurseIds}
                  onChange={handleNurseChange}
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
                  Update
                </button>
              </div>
              <div className="control">
                <button onClick={backDetail} className="button is-link is-light" type="button">
                  Cancel
                </button>
              </div>
            </div>    
      </form>
    </div>
  </div>
  )
}

export default FormEditPatient