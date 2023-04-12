import { UserType } from "../../types/user";
import axios from "./index";

interface SignUpAPIBody {
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  birthday: string;
}

export const signUpAPI = (body: SignUpAPIBody) =>
  axios.post<UserType>("/api/auth/signup", body);

export const loginAPI = (body: { email: string; password: string }) =>
  axios.post<UserType>("/api/auth/login", body);
