import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const notify = (isSuccessful) => isSuccessful
  ? toast.success("Post saved")
  : toast.error("An error occurred when saving");

const SaveAlert = () => {
  return (
    <ToastContainer autoClose={2000} hideProgressBar />
  );
}

export default SaveAlert;
