import styled from "styled-components";

export const H1 = (props: { children: React.ReactNode }) => {
  return (
    <StyledText size={20} weight={600}>
      {props.children}
    </StyledText>
  );
};

export const Row = styled.div<{
  colGap?: number;
  width?: string;
  justifyContent?: string;
  alignItems?: string;
}>`
  display: flex;
  flex-direction: row;
  column-gap: ${(props) => props.colGap || 0}px;
  width: ${(props) => props.width || "auto"};
  justify-content: ${(props) => props.justifyContent || "flex-start"};
  align-items: ${(props) => props.alignItems || "flex-start"};
`;
export const Col = styled.div<{
  rowGap?: number;
  paddingTop?: number;
  justifyContent?: string;
  alignItems?: string;
  height?: string;
}>`
  display: flex;
  flex-direction: column;
  row-gap: ${(props) => props.rowGap || 0}px;
  padding-top: ${(props) => props.paddingTop || 0}px;
  justify-content: ${(props) => props.justifyContent || "flex-start"};
  align-items: ${(props) => props.alignItems || "flex-start"};
  height: ${(props) => props.height || "auto"};
`;

export const StyledLink = styled.a`
  text-decoration: none;
  color: ${(props) => props.theme.linkColor};
`;

export const StyledText = styled.span<{
  color?: string;
  size?: number;
  weight?: number;
}>`
  color: ${(props) => props.color || props.theme.textColor};
  font-size: ${(props) => props.size || 16}px;
  font-weight: ${(props) => props.weight || 400};
`;

export const Paper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0px 0px 2px 0px #000000;
  justify-content: center;
  align-items: center;
`;

export const StyledInput = styled.input`
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #f1f1f1;
`;
