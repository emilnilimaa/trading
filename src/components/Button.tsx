import styled from "styled-components";

const StyledButton = styled.div<{ color?: string; textColor?: string }>`
  background-color: ${(props) => props.color || props.theme.colors.primary};
  color: ${(props) => props.textColor || props.theme.colors.white};
  padding: 12px 24px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  border-radius: 20px;
  border: none;
  &:hover {
    background-color: ${(props) => props.color || props.theme.colors.primary};
    pointer: cursor;
  }
  &:active {
    background-color: ${(props) => props.color || props.theme.colors.primary};
  }
  &:focus {
    outline: none;
  }
`;

const Button = (props: {
  color?: string;
  textColor?: string;
  title: string;
  onClick: () => void;
}) => {
  return (
    <StyledButton
      color={props.color}
      textColor={props.textColor}
      onClick={props.onClick}
    >
      {props.title}
    </StyledButton>
  );
};
export default Button;
