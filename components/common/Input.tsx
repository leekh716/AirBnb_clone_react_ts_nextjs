import styled, { css } from "styled-components";
import React from "react";
import palette from "../../styles/palette";

const Container = styled.div<{ iconExist: boolean }>`
  input {
    position: relative;
    width: 100%;
    height: 46px;
    padding: ${({ iconExist }) => (iconExist ? "0 44px 0 11px " : "0 11px")};
    border: 1px solid ${palette.gray_eb};
    border-radius: 4px;
    font-size: 16px;
    outline: none;
    &::placeholder {
      color: ${palette.gray_76};
    }
    &:focus {
      border-color: ${palette.dark_cyan};
    }
  }
  .input-icon-wrapper {
    position: absolute;
    top: 0;
    right: 11px;
    height: 46px;
    display: flex;
    align-items: center;
  }
`;

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: JSX.Element;
}

export default function Input({ icon, ...props }: IProps) {
  return (
    <Container iconExist={!!icon}>
      <input {...props} />
      {icon && <div className="input-icon-wrapper">{icon}</div>}
    </Container>
  );
}
