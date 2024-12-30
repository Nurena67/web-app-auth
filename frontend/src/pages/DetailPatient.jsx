import React, { useEffect } from "react";
import Layout from "./Layout";
import FormDetailPatient from "../components/FormDetailPatient";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { checkLogin } from "../features/authSlice";

const DetailPatient = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isError } = useSelector((state) => state.auth);
    
    useEffect(() => {
      dispatch(checkLogin());
    }, [dispatch]);
    
    useEffect(() => {
      if (isError) {
        navigate("/");
      }
    }, [isError, navigate]);
  return (
    <Layout>
        <FormDetailPatient/>
    </Layout>
  )
}

export default DetailPatient