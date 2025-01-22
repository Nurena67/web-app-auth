import React, { useEffect } from "react";
import Layout from "./Layout";
import FormEditPatient from "../components/FormEditPatient";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const EditPatient = () => {
  const navigate = useNavigate();

  useEffect(() => {
        const checkLogin = () => {
          const token = localStorage.getItem("token");
    
          if (!token) {
            navigate("/login");
            return;
          }
    
          try {
            jwt_decode(token);
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
      <FormEditPatient />
    </Layout>
  )
}

export default EditPatient