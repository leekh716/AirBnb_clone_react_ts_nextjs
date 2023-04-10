import axios from "./index";
import { UserType } from "../../types/user";

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
export const meAPI = () => axios.get<UserType>("/api/auth/me");
export const logoutAPI = () => axios.delete("/api/auth/logout");
