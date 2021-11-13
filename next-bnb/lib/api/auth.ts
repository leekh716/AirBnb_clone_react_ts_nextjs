import axios from "./index";
import { UserType } from "../../types/user";

interface SignUpAPIBody {
	email: string;
	firstname: string;
	lastname: string;
	password: string;
	birthday: string;
}

export const signUpAPI = (body: SignUpAPIBody) => axios.post<UserType>("/api/auth/signup", body);
