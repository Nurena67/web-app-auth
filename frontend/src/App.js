import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkLogin } from "./features/authSlice";
import Login from "./components/Login";
import Home from "./components/Home";
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import Users from "./pages/Users";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
import AddPatient from "./pages/AddPatient";
import DetailPatient from "./pages/DetailPatient";
import EditPatient from "./pages/EditPatient";
import NotFound from "./pages/NotFound";
import VerifyEmail from "./components/VerifyEmail";
import CreateAccount from "./components/createAccount";
import ForgotPasswordRequest from "./pages/ForgotPasswordRequest";
import ForgotPasswordVerify from "./pages/ForgotPasswordVerify";


function App() {
  const dispatch = useDispatch();
  const { user, isLoading, isError } = useSelector((state) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(checkLogin());
    }
  }, [dispatch]);


  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <p>Loading...</p>
      </div>
    );
  }
  
  if (isError) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <p>Error occurred! Please log in again.</p>
        <Navigate to="/login" /> {/* Pengalihan ke halaman login jika terjadi error */}
      </div>
    );
  }

  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="*" element={<NotFound/>}/>
        <Route path="/verify-email/:token" element={<VerifyEmail/>}/>
        <Route path="/register" element={<CreateAccount/>}/>
        <Route path="/forgot-password" element={<ForgotPasswordRequest/>}/>
        <Route path="/verify-otp" element={<ForgotPasswordVerify/>}/>
        <Route path="/login" element={ user? <Navigate to='/dashboard'/> : <Login/> } />
        <Route path="/dashboard" element={ user? <Dashboard/> : <Navigate to='/login' /> }/>
        <Route path="/patients" element={ user? <Patients/> : <Navigate to='/login' />}/>
        <Route path="/users" element={ user && user.role === 'admin' ? <Users/> : <Navigate to='/login' /> }/>
        <Route path="/users/add" element={<AddUser/>}/>
        <Route path="/users/edit/:id" element={<EditUser/>}/>
        <Route path="/patients/add" element={<AddPatient/>}/>
        <Route path="/patients/:medicalRecordNumber" element={<DetailPatient/>}/>
        <Route path="/patients/edit/:id" element={<EditPatient/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
