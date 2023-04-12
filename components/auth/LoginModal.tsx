import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import CloseXIcon from "../../public/static/svg/modal/modal_colose_x_icon.svg";
import MailIcon from "../../public/static/svg/auth/mail.svg";
import ClosedEyeIcon from "../../public/static/svg/auth/closed_eye.svg";
import OpenedEyeIcon from "../../public/static/svg/auth/opened_eye.svg";
import Input from "../common/Input";
import palette from "../../styles/palette";
import Button from "../common/Button";
import { authActions } from "../../store/auth";
import { loginAPI } from "../../lib/api/auth";
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

export default function LoginModal({ closeModal }: IProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordHided, setIsPasswordHided] = useState(true);
  const dispatch = useDispatch();

  const onChangeEmail = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(event.target.value);
    },
    []
  );
  const onChangePassword = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value);
    },
    []
  );
  const onTogglePasswordHide = useCallback(() => {
    setIsPasswordHided((prev) => !prev);
  }, []);

  const onChangeToSignUpModal = useCallback(() => {
    dispatch(authActions.setAuthMode("signUp"));
  }, [dispatch]);

  const onSubmitLogin = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!email || !password) {
        alert("이메일과 비밀번호를 모두 입력해주세요.");
      } else {
        const loginBody = { email, password };

        try {
          const { data } = await loginAPI(loginBody);
          dispatch(userActions.setLoggedUser(data));
          closeModal();
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error(e);
        }
      }
    },
    [closeModal, dispatch, email, password]
  );

  return (
    <Container onSubmit={onSubmitLogin}>
      <CloseXIcon className="modal-close-x-icon" onClick={closeModal} />
      <div className="login-input-wrapper">
        <Input
          placeholder="이메일 주소"
          type="email"
          icon={<MailIcon />}
          name="email"
          value={email}
          onChange={onChangeEmail}
        />
      </div>
      <div className="login-input-wrapper login-password-input-wrapper">
        <Input
          placeholder="비밀번호 입력"
          type={isPasswordHided ? "password" : "text"}
          icon={
            isPasswordHided ? (
              <ClosedEyeIcon onClick={onTogglePasswordHide} />
            ) : (
              <OpenedEyeIcon onClick={onTogglePasswordHide} />
            )
          }
          name="password"
          value={password}
          onChange={onChangePassword}
        />
      </div>
      <div className="login-modal-submit-button-wrapper">
        <Button type="submit">로그인</Button>
      </div>
      <p>
        아직 회원이 아니신가요?
        <span
          className="login-modal-set-signup"
          role="presentation"
          onClick={onChangeToSignUpModal}
        >
          회원가입
        </span>
      </p>
    </Container>
  );
}
