import { useEffect } from "react";
import styled, { useTheme } from "styled-components";
import { formatStockPrice } from "../api/stocks";
import { useAuthStore } from "../hooks/useAuth";
import { useStocks } from "../hooks/useStocks";
import useWindowSize from "../hooks/useWindowSize";
import { LayoutContainer, LayoutWrapper } from "../layout/styled";
import { Row, StyledLink, StyledText } from "./styled";

const HeaderContainer = styled.div`
  height: 29px;
  background-color: ${(props) => props.theme.headerBg};
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1;
  display: flex;
  align-items: center;
`;

const LoginContainer = styled.div`
  position: absolute;
  right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Header = () => {
  const { stocks, fetchStocks } = useStocks();
  const theme = useTheme();
  const { width } = useWindowSize();
  const authenticated = useAuthStore.use.authenticated();
  const setAuthenticated = useAuthStore.use.setAuthenticated();

  useEffect(() => {
    if (stocks.length === 0) {
      fetchStocks();
    }
    const interval = setInterval(() => {
      console.log("fetching stocks");
      fetchStocks();
    }, 10000);

    return () => clearInterval(interval);
  });

  const logout = () => {
    setAuthenticated(false);
  };

  return (
    <HeaderContainer>
      <LayoutWrapper>
        <LayoutContainer>
          {width > 720 && (
            <Row colGap={20}>
              {stocks.map((stock) => {
                return (
                  <Row key={stock.name} colGap={5}>
                    <StyledText size={14}>{stock.name}</StyledText>
                    <StyledText size={14} color={theme.colors.primary}>
                      {formatStockPrice(stock.price)}
                    </StyledText>
                  </Row>
                );
              })}
            </Row>
          )}
        </LayoutContainer>
      </LayoutWrapper>
      {!authenticated ? (
        <LoginContainer>
          <Row>
            <StyledLink href="/login">Login</StyledLink>
          </Row>
        </LoginContainer>
      ) : (
        <LoginContainer>
          <Row colGap={20}>
            <StyledLink href="/">My Page</StyledLink>
            <StyledLink onClick={logout}>Logout</StyledLink>
          </Row>
        </LoginContainer>
      )}
    </HeaderContainer>
  );
};
export default Header;
