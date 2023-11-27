import { createSlice } from "@reduxjs/toolkit";

const userTokenSession = sessionStorage.getItem("token");
const userTokenLocal = localStorage.getItem("token");

const userInfoLocal = localStorage.getItem("activeUser");
const userInfoSession = sessionStorage.getItem("activeUser");

const initialState = {
  activeUser: userInfoLocal
    ? JSON.parse(userInfoLocal)
    : userInfoSession
    ? JSON.parse(userInfoSession)
    : null,
  token: userTokenLocal
    ? userTokenLocal
    : userTokenSession
    ? userTokenSession
    : null,
  isRemember: false,
};

const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setActiveUser: (state, action) => {
      state.activeUser = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setRemember: (state, action) => {
      state.isRemember = action.payload;
    },
    logout: (state) => {
      state.activeUser = null;
      state.token = null;
      state.isRemember = false;
    },
  },
});

export const { setActiveUser, logout, setToken, setRemember } =
  authReducer.actions;

export default authReducer.reducer;
