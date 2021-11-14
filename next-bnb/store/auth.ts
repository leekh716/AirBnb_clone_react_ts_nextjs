import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: { authMode: "signup" | "login" } = {
	authMode: "signup",
};

const auth = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setAuthMode(state, action: PayloadAction<"signup" | "login">) {
			state.authMode = action.payload;
		},
	},
});

export const authActions = { ...auth.actions };

export default auth;
