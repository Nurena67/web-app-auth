import React, { useEffect } from "react";
import Layout from "./Layout";
import FormAddUser from "../components/FormAddUser";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AddUser = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginAndRole = () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login"); // Redirect ke login jika token tidak ada
        return;
      }

      try {
        const decoded = jwtDecode(token);
        if (decoded.role !== "admin") {
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    checkLoginAndRole();
  }, [navigate]);

  return (
    <Layout>
      <FormAddUser />
    </Layout>
  );
};

export default AddUser;