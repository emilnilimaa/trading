import { addMinutes, isBefore } from "date-fns";
import { useParams } from "react-router-dom";
import { Line, LineChart, XAxis, YAxis } from "recharts";
import { useTheme } from "styled-components";
import StockControls from "../components/StockControls";
import { Col, Row, StyledText } from "../components/styled";
import { useAuthStore } from "../hooks/useAuth";
import { useStocks } from "../hooks/useStocks";
import { PageWrapper } from "../layout/styled";

type PriceData = {
  date: Date;
  stockPrice: number;
};

const StockPage = () => {
  const { id } = useParams();
  const { stocks, stockHistory, fetchStocks } = useStocks();
  const theme = useTheme();
  const authenticated = useAuthStore.use.authenticated();

  const stock = stocks.find((stock) => stock.name === id);

  // Extract the data for this particular stock from the stock history.
  const stockData = (): PriceData[] => {
    const priceData = stockHistory.map((history) => {
      const date = history.date;
      const stockPrice =
        history.stocks.find((stock) => stock.name === id)?.price || 0;
      return { date, stockPrice };
    });

    const today = new Date();
    const minuteSpan = addMinutes(today, -10);

    // Filter to only show last 3 min.
    const filteredPriceData = priceData.filter((data) => {
      return isBefore(minuteSpan, data.date);
    });

    return filteredPriceData;
  };

  if (!id) {
    return (
      <PageWrapper>
        <Col>
          <Row>
            <StyledText>Missing stock name in url path</StyledText>
          </Row>
        </Col>
      </PageWrapper>
    );
  }

  if (!stock) {
    return (
      <PageWrapper>
        <Col>
          <Row>
            <StyledText>Stock not found: {id}</StyledText>
          </Row>
        </Col>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <Col rowGap={20}>
        <Row>
          <StyledText size={28} color={theme.colors.primary}>
            {stock.name}
          </StyledText>
        </Row>
        <Row colGap={10}>
          <StyledText size={16}>Current price:</StyledText>
          <StyledText size={16} color={theme.colors.primary}>
            {stock.price}
          </StyledText>
        </Row>
        <Col paddingTop={20}>
          <Row>
            <LineChart
              width={400}
              height={400}
              data={stockData()}
              style={{ marginLeft: -30 }}
            >
              <Line type="monotone" dataKey="stockPrice" stroke="#8884d8" />
              <XAxis dataKey="date" />
              <YAxis dataKey="stockPrice" />
            </LineChart>
          </Row>
        </Col>
        {authenticated && <StockControls stock={stock} />}
      </Col>
    </PageWrapper>
  );
};
export default StockPage;
