import React, { useEffect, useState } from "react";
import LockIcon from "@mui/icons-material/Lock";
import Input from "./Input";
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
import { UserLoginSchema, UserSignUpSchema } from "./../../ValidationSchema/index";
import { useFormik } from "formik";

const initialState = {
  username: "",
  mobileNumber: "",
  email: "",
  password: "",
};

const SignUp = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const loginForm = useFormik({
    initialValues: isSignup
      ? {
          username: "",
          mobileNumber: "",
          email: "",
          password: "",
        }
      : {
          email: "",
          password: "",
        },
    validationSchema: isSignup ? UserSignUpSchema : UserLoginSchema,
  
    onSubmit: async (values) => {
      try {
        if (isSignup) {
          const actionResult = await dispatch(signup(values))
          setIsSignup(false);
        } else {
          const actionResult = await dispatch(login(values));
          const {userId} = actionResult.payload
          const { token } = actionResult.payload;
          if (token) {
            localStorage.setItem("Token", token);
            localStorage.setItem("userId", userId);

            Navigate("/Products");
            toast.dismiss();
            toast.success("Welcome to the dashboard");
          }
        }
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
        {isSignup ? "Sign up" : "Sign in"}
      </Typography>
      <form onSubmit={loginForm.handleSubmit}>
        <Grid sx={{marginTop:"1rem"}} container spacing={2}>
          {isSignup && (
            <>
              <Input
                name="username"
                label="User Name"
                handleChange={loginForm.handleChange}
                autoFocus
                half
              />
              <Input
                name="mobileNumber"
                label="mobileNumber"
                handleChange={loginForm.handleChange}
                half
              />
            </>
          )}
          <Input
            name="email"
            label="email"
            value={loginForm.values.email}
            handleChange={loginForm.handleChange}
            onBlur={loginForm.handleBlur}
          />
          {loginForm.errors.email && loginForm.touched.email ? (
            <h6 className="text-danger mt-2 ml-1">
              {loginForm.errors.email}
            </h6>
          ) : null}
          <Input
            name="password"
            label="Password"
            value={loginForm.values.password}
            handleChange={loginForm.handleChange}
            onBlur={loginForm.handleBlur}
            type={showPassword ? "text" : "password"}
            handleShowPassword={handleShowPassword}
          />
          {loginForm.errors.password && loginForm.touched.password ? (
            <h6 className="text-danger mt-2 ml-1">
              {loginForm.errors.password}
            </h6>
          ) : null}
        </Grid>
        <Link to="/forgotPassword" style={{alignItems:"flex-end", textDecoration: 'none', color: '#1976d2' }}>
         Forgot Password
        </Link>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ marginTop: 2 }} 
        >
          {isSignup ? "Sign Up" : "Sign In"}
        </Button>
        <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
          <Grid item>
            <Button onClick={switchMode}>
              {isSignup
                ? "Already have an account? Sign in"
                : "Don't have an account? Sign Up"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  </Container>
  );
};

export default SignUp;
