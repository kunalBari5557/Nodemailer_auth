import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  token: null,
  user: null,
  loading: "idle",
  error: "",
};

export const signup = createAsyncThunk("auth/signup", async (credentials) => {
  const response = await axios.post(
    `${process.env.REACT_APP_URL}/user/signup`,
    credentials
  );
  return response.data;
});

export const login = createAsyncThunk("auth/login", async (credentials) => {
  const response = await axios.post(
    `${process.env.REACT_APP_URL}/user/login`,
    credentials
  );
  return response.data;
});

export const fetchUserData = createAsyncThunk(
  "admin/fetchData",
  async (thunkAPI) => {
    try {
      const token = localStorage.getItem("Token"); 
      const userId = localStorage.getItem("userId"); 

      const response = await axios.get(`${process.env.REACT_APP_URL}/user/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/update",
  async (payload, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("Token");
      const userId = localStorage.getItem("userId");
      const response = await axios.put(
        `${process.env.REACT_APP_URL}/user/${userId}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(signup.pending, (state) => {
      state.loading = "pending";
    })
    .addCase(signup.fulfilled, (state, action) => {
      state.loading = "fulfilled";
      // state.token = action.payload.token;
      state.user = action.payload.user;
      state.error = "";
    })
    .addCase(signup.rejected, (state, action) => {
      state.loading = "rejected";
      state.error = action.error.message;
    })
      .addCase(login.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.error = "";
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = "rejected";
        state.error = action.error.message;
      })
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload 
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        // state.error = action.payload ? action.payload.error : 'Unknown error';
      })
  },
});

export default authSlice.reducer;
