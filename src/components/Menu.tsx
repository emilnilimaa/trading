import styled from "styled-components";
import { LayoutContainer, LayoutWrapper } from "../layout/styled";
import { Row, StyledLink } from "./styled";

const MenuContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  height: 70px;
  background-color: #fff;
  border-bottom: 1px solid #f1f1f1;
`;

const Menu = () => {
  return (
    <MenuContainer>
      <LayoutWrapper>
        <LayoutContainer>
          <Row colGap={20}>
            <StyledLink href="/stock/AAPL">AAPL</StyledLink>
            <StyledLink href="/stock/GOOGL">GOOGL</StyledLink>
            <StyledLink href="/stock/MSFT">MSFT</StyledLink>
            <StyledLink href="/stock/AXFO">AXFO</StyledLink>
            <StyledLink href="/stock/TSLA">TSLA</StyledLink>
          </Row>
        </LayoutContainer>
      </LayoutWrapper>
    </MenuContainer>
  );
};
export default Menu;
