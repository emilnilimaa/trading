import { useTheme } from "styled-components";
import { formatStockPrice } from "../api/stocks";
import { Col, Paper, Row, StyledLink, StyledText } from "../components/styled";
import { useStocks } from "../hooks/useStocks";
import { useWalletStore } from "../hooks/useWallet";
import { PageWrapper } from "../layout/styled";

const HomePage = () => {
  const theme = useTheme();
  const balance = useWalletStore.use.balance();
  const walletStocks = useWalletStore.use.stocks();
  const { stocks } = useStocks();

  const calculateTotalValue = () => {
    return walletStocks.reduce((acc, stock) => {
      const stockData = stocks.find((s) => s.name === stock.name);
      return acc + (stockData?.price ?? 0) * (stock.amount ?? 0);
    }, 0);
  };

  return (
    <PageWrapper>
      <Col rowGap={20}>
        <Row>
          <StyledText size={28} color={theme.colors.primary}>
            Welcome to the stock app!
          </StyledText>
        </Row>
        <Row colGap={20}>
          <Paper>
            <StyledText>Your balance: {formatStockPrice(balance)}</StyledText>
          </Paper>
          <Paper>
            <StyledText>
              Total value: {formatStockPrice(balance + calculateTotalValue())}
            </StyledText>
          </Paper>
        </Row>
      </Col>
      <Col rowGap={20} paddingTop={20}>
        <Row>
          <StyledText size={20} color={theme.colors.primary}>
            Your stocks
          </StyledText>
        </Row>
        {walletStocks.length < 1 ? (
          <Row>
            <StyledText>You have no stocks</StyledText>
          </Row>
        ) : (
          walletStocks.map((walletStock) => {
            const stock = stocks.find((s) => s.name === walletStock.name);
            return (
              <Row
                key={walletStock.name}
                width="400px"
                justifyContent="space-between"
              >
                <StyledLink href={`/stock/${walletStock.name}`}>
                  {walletStock.name}
                </StyledLink>
                <Row colGap={20}>
                  <Row width="50px">
                    <StyledText>{walletStock.amount ?? 0}</StyledText>
                  </Row>
                  <Row width="50px">
                    <StyledText color={theme.colors.primary}>
                      ({formatStockPrice(stock?.price ?? 0)})
                    </StyledText>
                  </Row>
                  <Row width="50px">
                    <StyledText>
                      {formatStockPrice(
                        (stock?.price ?? 0) * walletStock.amount ?? 0
                      )}
                    </StyledText>
                  </Row>
                </Row>
              </Row>
            );
          })
        )}
      </Col>
    </PageWrapper>
  );
};
export default HomePage;
