import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkLogin } from "./features/authSlice";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import Users from "./pages/Users";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
import AddPatient from "./pages/AddPatient";
import DetailPatient from "./pages/DetailPatient";
import EditPatient from "./pages/EditPatient";
function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(checkLogin());
    }
  }, [dispatch]);
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={ user? <Navigate to='/dashboard'/> : <Login/> } />
        <Route path="/dashboard" element={ <Dashboard/> }/>
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
