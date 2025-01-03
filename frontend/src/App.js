import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import Users from "./pages/Users";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
import AddPatient from "./pages/AddPatient";
import DetailPatient from "./pages/DetailPatient";
import EditPatient from "./pages/EditPatient";
function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/patients" element={<Patients/>}/>
        <Route path="/users" element={<Users/>}/>
        <Route path="/users/add" element={<AddUser/>}/>
        <Route path="/users/edit/:id" element={<EditUser/>}/>
        <Route path="/patients/add" element={<AddPatient/>}/>
        <Route path="/patients/detail" element={<DetailPatient/>}/>
        <Route path="/patients/edit/:id" element={<EditPatient/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
