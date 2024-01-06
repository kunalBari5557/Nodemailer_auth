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
import { userForgotPasswordSchema } from "../../ValidationSchema/index";
import { useFormik } from "formik";
import { updatePassword } from "../../redux/fetures/ForgotPassword/ForgotPassword";

const CreateNewPassword = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);
  const sendEmail = localStorage.getItem("Email"); 
  const ResetToken = localStorage.getItem("ResetToken"); 

  const forgotForm = useFormik({
    initialValues: {
          email:sendEmail,
          resetToken:ResetToken,
          newPassword:"",
          password: "",
        },
    validationSchema: userForgotPasswordSchema ,
  
    onSubmit: async (values) => {
      try {
          const actionResult = await dispatch(updatePassword(values));
          Navigate("/")
      } catch (error) {
        toast.dismiss();
        toast.error("Invalid password. Please try again.");
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
       Reset Password
      </Typography>
      <form onSubmit={forgotForm.handleSubmit}>
        <Grid sx={{marginTop:"1rem"}} container spacing={2}>
            <>
            <Input
            name="newPassword"
            label="New Password"
            value={forgotForm.values.newPassword}
            handleChange={forgotForm.handleChange}
            onBlur={forgotForm.handleBlur}
            type={showPassword ? "text" : "password"}
            handleShowPassword={handleShowPassword}
          />
          {forgotForm.errors.newPassword && forgotForm.touched.newPassword ? (
            <h6 className="text-danger mt-2 ml-1">
              {forgotForm.errors.newPassword}
            </h6>
          ) : null}
          <Input
            name="password"
            label="Confirm Password"
            value={forgotForm.values.password}
            handleChange={forgotForm.handleChange}
            onBlur={forgotForm.handleBlur}
            type={showPassword ? "text" : "password"}
            handleShowPassword={handleShowPassword}
          />
          {forgotForm.errors.password && forgotForm.touched.password ? (
            <h6 className="text-danger mt-2 ml-1">
              {forgotForm.errors.password}
            </h6>
          ) : null}
            </>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ marginTop: 2 }} 
        >
         Reset Password
        </Button>
      </form>
    </Paper>
  </Container>
  );
};

export default CreateNewPassword;
