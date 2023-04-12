import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: { authMode: "signUp" | "login" } = {
  authMode: "signUp",
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthMode(state, action: PayloadAction<"signUp" | "login">) {
      state.authMode = action.payload;
    },
  },
});

export const authActions = { ...auth.actions };

export default auth;
