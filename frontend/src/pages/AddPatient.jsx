import React, { useEffect } from "react";
import Layout from "./Layout";
import FormAddPatient from "../components/FormAddPatient";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { checkLogin } from "../features/authSlice";

const AddPatient = () => {
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
      <FormAddPatient />
    </Layout>
  );
};

export default AddPatient;