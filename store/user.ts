import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserState } from "../types/reduxState";
import { UserType } from "../types/user";

const initialState: UserState = {
  id: 0,
  email: "",
  lastname: "",
  firstname: "",
  birthday: "",
  profileImage: "",
  isLogged: false,
};

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoggedUser(state, action: PayloadAction<UserType>) {
      state = { ...action.payload, isLogged: true };
      return state;
    },
  },
});

export const userActions = { ...user.actions };

export default user;
