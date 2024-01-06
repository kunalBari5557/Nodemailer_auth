import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import { Link, Route, Routes, useLocation, Navigate } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import LogoutButton from "./components/LogoutButton/LogoutButton";
import Products from "./components/Products/Products";
import { AiFillHome } from "react-icons/ai";
import Tooltip from "@mui/material/Tooltip";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData, updateUser } from "./redux/fetures/Auth/Auth";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { userUpdateSchema } from "./ValidationSchema";
import { Grid, TextField } from "@mui/material";
import Swal from "sweetalert2";
import PageNotFound from "./common/PageNotFound/PageNotFound";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import CreateNewPassword from "./components/ForgotPassword/CreateNewPassword";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Sidenav() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };
  const handleClose = () => {
    setOpenDialog(false);
  };

  const location = useLocation();
  const tokenState = localStorage.getItem("Token");
  const userProfile = useSelector((state) => state.auth?.data);
  const [profileData, setProfileData] = useState(userProfile || {});

  const userEdit = useFormik({
    initialValues: {
      id: profileData?.id || "",
      username: profileData?.username || "",
      email: profileData?.email || "",
      mobileNumber: profileData?.mobileNumber || "",
    },
    enableReinitialize: true,
    validationSchema: userUpdateSchema,
    onSubmit: (values) => {
      console.log("values", values);
      dispatch(updateUser(values))
        .then((res) => {
          if (res?.meta?.requestStatus === "fulfilled") {
            Swal.fire({
              title: "Updated Successfully.",
              icon: "success",
              showConfirmButton: false,
              timer: 2000,
            });
          }
          setProfileData(values);
          setOpenDialog(false);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  useEffect(() => {
    setProfileData(userProfile || {});
  }, [userProfile]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {(location.pathname !== "/" && location.pathname !== "/forgotPassword" && location.pathname !== "/createNewPassword") ? (
        <AppBar
          position="fixed"
          elevation={4}
          sx={{ backgroundColor: "#ffffff", color: "#2f2f2f" }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => setOpen(!open)}
              edge="start"
            >
              <MenuIcon className="radius_icon" />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              {/* <img src="./logo.png" height={70} alt="YouTube Logo" /> */}
            </Typography>
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                marginLeft: "auto",
                cursor: "pointer",
              }}
            >
              <>
                <Button sx={{marginLeft:"60rem !important"}} variant="outlined" onClick={handleClickOpen}>
                  Profile
                </Button>
                <BootstrapDialog
                  onClose={handleClose}
                  aria-labelledby="customized-dialog-title"
                  open={openDialog}
                >
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      userEdit.handleSubmit(e);
                    }}
                  >
                    <DialogTitle
                      sx={{ m: 0, p: 2 }}
                      id="customized-dialog-title"
                    >
                      Update Profile
                    </DialogTitle>
                    <IconButton
                      aria-label="close"
                      onClick={handleClose}
                      sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                      }}
                    >
                      <CloseIcon />
                    </IconButton>
                    <DialogContent dividers>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            name="username"
                            label="Username"
                            value={userEdit.values.username}
                            onChange={userEdit.handleChange}
                            error={
                              userEdit.touched.username &&
                              Boolean(userEdit.errors.username)
                            }
                            helperText={
                              userEdit.touched.username &&
                              userEdit.errors.username
                            }
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            name="email"
                            label="Email"
                            value={userEdit.values.email}
                            onChange={userEdit.handleChange}
                            error={
                              userEdit.touched.email &&
                              Boolean(userEdit.errors.email)
                            }
                            helperText={
                              userEdit.touched.email && userEdit.errors.email
                            }
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            name="mobileNumber"
                            label="Mobile Number"
                            value={userEdit.values.mobileNumber}
                            onChange={userEdit.handleChange}
                            error={
                              userEdit.touched.mobileNumber &&
                              Boolean(userEdit.errors.mobileNumber)
                            }
                            helperText={
                              userEdit.touched.mobileNumber &&
                              userEdit.errors.mobileNumber
                            }
                          />
                        </Grid>
                      </Grid>
                    </DialogContent>
                    <DialogActions>
                      <Button
                        sx={{ marginTop: "1rem" }}
                        type="submit"
                        color="primary"
                        variant="contained"
                      >
                        Update Profile
                      </Button>
                    </DialogActions>
                  </form>
                </BootstrapDialog>
              </>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                marginLeft: "auto",
                cursor: "pointer",
              }}
            >
              <LogoutButton />
            </div>
          </Toolbar>
        </AppBar>
      )
    :
    (
      null
    )}
      {(location.pathname !== "/" && location.pathname !== "/forgotPassword" && location.pathname !== "/createNewPassword") ? (
        <Drawer variant="permanent" open={open}>
          <Divider />
          <List sx={{ marginTop: "4rem" }}>
            <ListItem disablePadding>
              <ListItemButton
                style={{
                  backgroundColor:
                    location.pathname === "/Products" ? "black" : "transparent",
                }}
              >
                <Tooltip title="Products" arrow placement="right">
                  <ListItemIcon>
                    <Link to="/Products">
                      <AiFillHome className="radius_icon" />
                    </Link>
                  </ListItemIcon>
                </Tooltip>
                <Link
                  to="/Products"
                  style={{
                    color:
                      location.pathname === "/Products" ? "white" : "black",
                    textDecoration: "none",
                  }}
                >
                  Products
                </Link>
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
        </Drawer>
      )
    :
    (
      null
    )}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Routes>
          {!tokenState ? (
            <>
              <Route path="/" element={<Auth />} />
              <Route path="/forgotPassword" element={<ForgotPassword />} />
              <Route path="/createNewPassword" element={<CreateNewPassword />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          ) : (
            <>
              <Route path="/Products" element={<Products />} />
              <Route path="*" element={<PageNotFound />} /> 
            </>
          )}
        </Routes>
      </Box>
    </Box>
  );
}
