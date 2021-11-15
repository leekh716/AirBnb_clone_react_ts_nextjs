import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CloseXIcon from "../../public/static/svg/modal/modal_colose_x_icon.svg";
import MailIcon from "../../public/static/svg/auth/mail.svg";
import ClosedEyeIcon from "../../public/static/svg/auth/closed_eye.svg";
import OpenedEyeIcon from "../../public/static/svg/auth/opened_eye.svg";
import Input from "../common/Input";
import palette from "../../styles/palette";
import Button from "../common/Button";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import { loginAPI } from "../../lib/api/auth";
import useValidateMode from "../../hooks/useValidateMode";
import { userActions } from "../../store/user";

const Container = styled.form`
	width: 568px;
	padding: 32px;
	background-color: white;
	z-index: 11;

	.modal-close-x-icon {
		cursor: pointer;
		display: block;
		margin: 0 0 40px auto;
	}

	.login-input-wrapper {
		position: relative;
		margin-bottom: 16px;
	}

	.login-password-input-wrapper {
		svg {
			cursor: pointer;
		}
	}

	.login-modal-submit-button-wrapper {
		margin-bottom: 16px;
		padding-bottom: 16px;
		border-bottom: 1px solid ${palette.gray_eb};
	}
	.login-modal-set-signup {
		color: ${palette.dark_cyan};
		margin-left: 8px;
		cursor: pointer;
	}
`;

interface IProps {
	closeModal: () => void;
}

const LoginModal: React.FC<IProps> = ({ closeModal }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isPasswordHided, setIsPasswordHided] = useState(true);
	const dispatch = useDispatch();

	const { setValidateMode } = useValidateMode();

	const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value);
	};
	const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(event.target.value);
	};

	const togglePasswordHiding = () => {
		setIsPasswordHided(!isPasswordHided);
	};

	const changeToSignUpModal = () => {
		dispatch(authActions.setAuthMode("signup"));
	};

	const onSubmitLogin = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setValidateMode(true);

		if (!email || !password) {
			return null;
		} else {
			const loginBody = { email, password };

			try {
				const { data } = await loginAPI(loginBody);
				dispatch(userActions.setLoggedUser(data));
				closeModal();
				console.log(data);
			} catch (e) {
				console.log(e);
			}
		}
	};

	useEffect(() => {
		return () => {
			setValidateMode(false);
		};
	}, []);

	return (
		<Container onSubmit={onSubmitLogin}>
			<CloseXIcon className="modal-close-x-icon" onClick={closeModal} />
			<div className="login-input-wrapper">
				<Input placeholder="이메일 주소" type="email" icon={<MailIcon />} name="email" value={email} onChange={onChangeEmail} isValid={email !== ""} errorMessage="이메일을 입력하세요." />
			</div>
			<div className="login-input-wrapper login-password-input-wrapper">
				<Input
					placeholder="비밀번호 입력"
					type={isPasswordHided ? "password" : "text"}
					icon={isPasswordHided ? (
						<ClosedEyeIcon onClick={togglePasswordHiding} />
					) : (
						<OpenedEyeIcon onClick={togglePasswordHiding} />
						)
					}
					value={password}
					onChange={onChangePassword}
					isValid={password !== ""}
					errorMessage="비밀번호를 입력하세요."
				/>
			</div>
			<div className="login-modal-submit-button-wrapper">
				<Button type="submit">로그인</Button>
			</div>
			<p>
				에어비앤비 계정이 없나요?
				<span className="login-modal-set-signup" onClick={changeToSignUpModal}>
					회원가입
				</span>
			</p>
		</Container>
	);
};

export default LoginModal;
