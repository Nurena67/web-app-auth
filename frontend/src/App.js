import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { setCredentials, logout } from "./features/AuthSlice.js"
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
import VerifyEmail from "./components/VerifyEmail.jsx";
import ForgotPasswordRequest from "./pages/ForgotPasswordRequest";
import ForgotPasswordVerify from "./pages/ForgotPasswordVerify";
import CreateAccount from './components/CreateAccount.jsx';

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        dispatch(setCredentials({ user: decodedToken, token })); 
      } catch (error) {
        console.error("Invalid token:", error);
        dispatch(logout());
      }
    }
  }, [dispatch]);

  if (!user && localStorage.getItem("token")) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={isAuthenticated ? <Navigate to="/dashboard" /> : <Home />}
          />
          <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
          <Route path="/register" element={ <CreateAccount/> }/>
          <Route path="/verify-email/:token" element={<VerifyEmail />} />
          <Route path="/forgot-password" element={<ForgotPasswordRequest />} />
          <Route path="/verify-otp" element={<ForgotPasswordVerify />} />
          <Route path="*" element={<NotFound />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/patients"
            element={
              <ProtectedRoute>
                <Patients />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <Users />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users/add"
            element={
              <ProtectedRoute>
                <AddUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users/edit/:id"
            element={
              <ProtectedRoute>
                <EditUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="/patients/add"
            element={
              <ProtectedRoute>
                <AddPatient />
              </ProtectedRoute>
            }
          />
          <Route
            path="/patients/:medicalRecordNumber"
            element={
              <ProtectedRoute>
                <DetailPatient />
              </ProtectedRoute>
            }
          />
          <Route
            path="/patients/edit/:id"
            element={
              <ProtectedRoute>
                <EditPatient />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
