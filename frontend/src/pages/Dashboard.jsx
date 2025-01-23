import React, { useEffect , useState} from "react";
import Layout from "./Layout";
import Welcome from "../components/Welcome";
import { useNavigate } from "react-router-dom";


const Dashboard = () => {
  

  return (
    <Layout>
      <Welcome />
    </Layout>
  );
};

export default Dashboard;