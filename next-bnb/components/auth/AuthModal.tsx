import React from "react";
import { RootState, useSelector } from "../../store";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";

interface IProps {
	closeModal: () => void;
}

const AuthModal: React.FC<IProps> = ({ closeModal }) => {
	const authMode = useSelector((state: RootState) => state.auth.authMode);

	return (
		<>
			{authMode === "signup" && <SignUpModal closeModal={closeModal} />}
			{authMode === "login" && <LoginModal closeModal={closeModal} />}
		</>
	);
};

export default AuthModal;
