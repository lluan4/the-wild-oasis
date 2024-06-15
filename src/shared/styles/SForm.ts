import styled, { css } from "styled-components";
import { IStyledFormProps } from "../interfaces/IForm";

export const Form = styled.form<IStyledFormProps>`
  ${(props) =>
    props.$variation !== "regular" &&
    css`
      padding: 2.4rem 4rem;

      /* Box */
      background-color: var(--color-grey-0);
      border: 1px solid var(--color-grey-100);
      border-radius: var(--border-radius-md);
    `}

  ${(props) =>
    props.$variation === "modal" &&
    css`
      width: 80rem;
    `}
    
  overflow: hidden;
  font-size: 1.4rem;
`;
