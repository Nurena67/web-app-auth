import React, { useEffect , useState} from "react";
import Layout from "./Layout";
import Welcome from "../components/Welcome";
import { useNavigate } from "react-router-dom";


const Dashboard = () => {
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);

 
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsError(true);
    }
  }, []);

  useEffect(() => {
    if (isError) {
      navigate("/login");
    }
  }, [isError, navigate]);

  return (
    <Layout>
      <Welcome />
    </Layout>
  );
};

export default Dashboard;