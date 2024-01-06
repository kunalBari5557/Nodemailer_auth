import React, { useEffect, useState } from "react";
import LockIcon from "@mui/icons-material/Lock";
// import Input from "./Input";
import Input from "../Auth/Input";
import {
  Avatar,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { login, signup } from "../../redux/fetures/Auth/Auth";
import { userForgotPasswordEmailSchema, userForgotPasswordSchema } from "./../../ValidationSchema/index";
import { useFormik } from "formik";
import { addEmail } from "../../redux/fetures/ForgotPassword/ForgotPassword";

const ForgotPassword = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const forgotForm = useFormik({
    initialValues:  { email: "" },
    validationSchema: userForgotPasswordEmailSchema,
  
    onSubmit: async (values) => {
      try {
          const actionResult = await dispatch(addEmail(values));
          const Email = actionResult.payload?.email
          const ResetToken = actionResult.payload?.resetToken
          localStorage.setItem("Email", Email);
          localStorage.setItem("ResetToken", ResetToken);
          Navigate("/")
      } catch (error) {
        toast.dismiss();
        toast.error("Invalid email or password. Please try again.");
      }
    },
  });
  
  return (
    <Container component="main" maxWidth="xs" sx={{ paddingX: 3 }}>
    <Paper
     sx={{
      marginTop: 8,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: 5,
      borderRadius:2
    }}
    elevation={3}>
      <Avatar sx={{ backgroundColor: "#f50057" }}>
        <LockIcon />
      </Avatar>
      <Typography component="h1" variant="h5" sx={{ textAlign: "center",marginTop:"1rem" }}>
        Add Email
      </Typography>
      <form onSubmit={forgotForm.handleSubmit}>
        <Grid sx={{marginTop:"1rem"}} container spacing={2}>
          <Input
            name="email"
            label="email"
            value={forgotForm.values.email}
            handleChange={forgotForm.handleChange}
            onBlur={forgotForm.handleBlur}
          />
          {forgotForm.errors.email && forgotForm.touched.email ? (
            <h6 className="text-danger mt-2 ml-1">
              {forgotForm.errors.email}
            </h6>
          ) : null}
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ marginTop: 2 }} 
        >
          Add Email
        </Button>
      </form>
    </Paper>
  </Container>
  );
};

export default ForgotPassword;
