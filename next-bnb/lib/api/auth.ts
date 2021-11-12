import axios from "axios";

interface SignUpAPIBody {
	email: string;
	firstname: string;
	lastname: string;
	password: string;
	birthday: string;
}

export const signUpAPI = (body: SignUpAPIBody) => axios.post("/api/auth/signup", body);
