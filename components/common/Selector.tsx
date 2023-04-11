import React from "react";
import styled, { css } from "styled-components";
import palette from "../../styles/palette";
import { useSelector } from "../../store";
// import WarningIcon from "../../public//static/svg/common/warning.svg";

interface SelectorContainerProps {
  isValid: boolean;
  validateMode: boolean;
}

const Container = styled.div<SelectorContainerProps>`
  width: 100%;
  height: 46px;

  select {
    width: 100%;
    height: 100%;
    background-color: white;
    border: 1px solid ${palette.gray_eb};
    padding: 0 11px;
    border-radius: 4px;
    outline: none;
    appearance: none;
    -webkit-appearance: none;
    background-image: url("/static/svg/common/selector/selector_down_arrow.svg");
    background-position: right 11px center;
    background-repeat: no-repeat;
    font-size: 16px;
    &:focus {
      border-color: ${palette.dark_cyan};
    }
  }

  ${({ isValid, validateMode }) =>
    validateMode &&
    css`
      select {
        border-color: ${isValid ? palette.dark_cyan : palette.tawny};
        !important

        background-color: ${isValid ? "white" : palette.snow};
      }
    `}
`;

interface IProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options?: string[];
  disabledOptions?: string[];
  value?: string;
  isValid?: boolean;
}

export default function Selector({
  options = [],
  disabledOptions = [],
  isValid = true,
  ...props
}: IProps) {
  const { validateMode } = useSelector((state) => state.common);

  return (
    <Container isValid={!!isValid} validateMode={validateMode}>
      <select {...props}>
        {disabledOptions.map((option, i) => (
          <option key={i} value={option} disabled>
            {option}
          </option>
        ))}
        {options.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>
    </Container>
  );
}
