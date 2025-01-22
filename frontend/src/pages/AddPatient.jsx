import React, { useEffect } from "react";
import Layout from "./Layout";
import FormAddPatient from "../components/FormAddPatient";
import { useNavigate } from "react-router-dom";


const AddPatient = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkLogin = () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
      }
    };

    checkLogin();
  }, [navigate]);

  return (
    <Layout>
      <FormAddPatient />
    </Layout>
  );
};

export default AddPatient;