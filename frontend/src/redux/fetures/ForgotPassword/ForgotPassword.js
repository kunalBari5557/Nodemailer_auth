import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  email: [],
  product: null,
  loading: 'idle',
  error: null,
};

export const addEmail = createAsyncThunk('email/addEmail', async (newProduct) => {
  const response = await axios.post(`${process.env.REACT_APP_URL}/user/sendEmail`, newProduct);
  return response.data;
});

export const updatePassword = createAsyncThunk('email/updatePassword', async (newPassword) => {
  const response = await axios.post(`${process.env.REACT_APP_URL}/user/resetPassword`, newPassword);
  return response.data;
});

export const forgotPasswordSlice = createSlice({
  name: 'email',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addEmail.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(addEmail.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
        state.email.push(action.payload);
        state.error = null;
      })
      .addCase(addEmail.rejected, (state, action) => {
        state.loading = 'rejected';
        state.error = action.error.message;
      })
      .addCase(updatePassword.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
        state.email.push(action.payload);
        state.error = null;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.loading = 'rejected';
        state.error = action.error.message;
      })
  },
});

export default forgotPasswordSlice.reducer;