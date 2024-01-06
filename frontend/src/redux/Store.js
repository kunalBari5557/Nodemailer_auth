import { configureStore } from "@reduxjs/toolkit";
import  authSlice from './fetures/Auth/Auth'
import  productsSlice  from "./fetures/Products/Products";
import forgotPasswordSlice  from "./fetures/ForgotPassword/ForgotPassword";

const store = configureStore({
  reducer: {
    auth: authSlice,
    productsState: productsSlice,
    forgotPasswordState: forgotPasswordSlice
  },
});

export default store;
