import React, { useEffect } from "react";
import Layout from "./Layout";
import FormDetailPatient from "../components/FormDetailPatient";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const DetailPatient = () => {
    const navigate = useNavigate();
    
    useEffect(() => {
      const checkLogin = () => {
        const token = localStorage.getItem("token");
  
        if (!token) {
          navigate("/login");
          return;
        }
  
        try {
          jwtDecode(token);
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
        <FormDetailPatient/>
    </Layout>
  )
}

export default DetailPatient