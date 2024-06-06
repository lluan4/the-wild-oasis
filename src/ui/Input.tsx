import styled from "styled-components";

const Input = styled.input`
  border: 1px solid ${(props) => props.theme.colors.grey[300]};
  background-color: 1px solid ${(props) => props.theme.colors.grey[0]};
  border-radius: ${(props) => props.theme.borderRadius.sm};
  padding: 0.8em 1.2em;
  box-shadow: ${(props) => props.theme.shadows.sm};
`;

export default Input;
