import React, {useState, useEffect} from "react";
import { useNavigate, useParams} from "react-router-dom";
import axios from "axios";

const FormEditPatient = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    bloodGroup: '',
    complaint: '',
    medicalHistory: '',
    familyName: '',
  });
  
  useEffect(() => {
    const getPatientsByid = async () => {
        try {
            const response = await axios.get(`https://web-app-auth-production.up.railway.app/patients/${id}`);
            setFormData(response.data);  // Menyimpan data ke state
        } catch (error) {
            console.error("Error get patients:", error);
        }
    }
    getPatientsByid();
}, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`https://web-app-auth-production.up.railway.app/patients/${id}`,formData);
    alert('Pasien Berhasil di Update');
    backDetail();
  };
  
  const backDetail = () => {
    navigate('/patients/detail');
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