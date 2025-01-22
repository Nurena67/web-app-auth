import React, { useEffect } from "react";
import Layout from "./Layout";
import PatientList from "../components/PatientList";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const Patients = () => {
    const navigate = useNavigate();

    useEffect(() => {
      const checkLogin = () => {
        const token = localStorage.getItem("token");
  
        if (!token) {
          navigate("/login");
          return;
        }
  
        try {
          const decodedToken = jwt_decode(token);
  
          if (!decodedToken.role || decodedToken.role !== "admin") {
            navigate("/dashboard");
          }
        } catch (error) {
          console.error("Invalid token:", error);
          localStorage.removeItem("token");
          navigate("/login");
        }
      };
  
      checkLogin();
    }, [navigate]);

  return (
    <Layout>
        <PatientList/>
    </Layout>
  )
}

export default Patients