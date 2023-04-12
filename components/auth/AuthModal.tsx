import { useSelector } from "../../store";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";

interface IProps {
  closeModal: () => void;
}

export default function AuthModal({ closeModal }: IProps) {
  const { authMode } = useSelector((state) => state.auth);

  return (
    <>
      {authMode === "signUp" && <SignUpModal closeModal={closeModal} />}
      {authMode === "login" && <LoginModal closeModal={closeModal} />}
    </>
  );
}
