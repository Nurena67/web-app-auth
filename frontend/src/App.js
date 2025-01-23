// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import jwtDecode  from "jwt-decode";
// import Login from "./components/Login";
// import Home from "./components/Home";
// import Dashboard from "./pages/Dashboard";
// import Patients from "./pages/Patients";
// import Users from "./pages/Users";
// import AddUser from "./pages/AddUser";
// import EditUser from "./pages/EditUser";
// import AddPatient from "./pages/AddPatient";
// import DetailPatient from "./pages/DetailPatient";
// import EditPatient from "./pages/EditPatient";
// import NotFound from "./pages/NotFound";
// import VerifyEmail from "./components/VerifyEmail";
// import CreateAccount from "./components/createAccount";
// import ForgotPasswordRequest from "./pages/ForgotPasswordRequest";
// import ForgotPasswordVerify from "./pages/ForgotPasswordVerify";

// import ProtectedRoute from "./components/ProtectedRoute";


// function App() {
//   const [user, setUser] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const checkLogin = () => {
//       const token = localStorage.getItem("token");
//       if (token) {
//         try {
//           const decodedToken = jwtDecode(token);
//           setUser(decodedToken);
//         } catch (error) {
//           console.error("Invalid token:", error);
//           localStorage.removeItem("token");
//           setUser(null);
//         }
//       }
//       setIsLoading(false);
//     };

//     checkLogin();
//   }, []);

//   if (isLoading) {
//     return (
//       <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//         <p>Loading...</p>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Home/>}/>
//         <Route path="*" element={<NotFound/>}/>
//         <Route path="/verify-email/:token" element={<VerifyEmail/>}/>
//         <Route path="/register" element={<CreateAccount/>}/>
//         <Route path="/forgot-password" element={<ForgotPasswordRequest/>}/>
//         <Route path="/verify-otp" element={<ForgotPasswordVerify/>}/>
//         <Route path="/login" element={ <Login/> } />
//         <Route path="/dashboard" element={ 
//           <ProtectedRoute>
//             <Dashboard/>
//           </ProtectedRoute>
//         }/>
        
//         <Route path="/patients" element={ <Patients/> }/>
//         <Route path="/users" element={ <Users/> }/>
//         <Route path="/users/add" element={<AddUser/>}/>
//         <Route path="/users/edit/:id" element={<EditUser/>}/>
//         <Route path="/patients/add" element={<AddPatient/>}/>
//         <Route path="/patients/:medicalRecordNumber" element={<DetailPatient/>}/>
//         <Route path="/patients/edit/:id" element={<EditPatient/>}/>
//       </Routes>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
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
import ForgotPasswordRequest from "./pages/ForgotPasswordRequest";
import ForgotPasswordVerify from "./pages/ForgotPasswordVerify";
// import CreateAccount from './components/CreateAccount';

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkLogin = () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          setUser(decodedToken);
        } catch (error) {
          console.error("Invalid token:", error);
          localStorage.removeItem("token");
          setUser(null);
        }
      }
      setIsLoading(false);
    };

    checkLogin();
  }, []);

  if (isLoading) {
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

  const isAuthenticated = !!user;

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
          {/* <Route path="/register" element={<CreateAccount />} /> */}
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
