import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  appState: "",
  open: true,
};

export const appStateSlice = createSlice({
  name: "appState",
  initialState,
  reducers: {
    setAppState: (state, action) => {
      state.appState = action.payload;
    },
    handleDrawerOpen: (state, action) => {
      state.open = true;
    },
    handleDrawerClose: (state, action) => {
      state.open = false;
    },
  },
});

export const { setAppState, open, handleDrawerOpen, handleDrawerClose } =
  appStateSlice.actions;

export default appStateSlice.reducer;
