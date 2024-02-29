import { Alert } from "@mui/material";
import { useState } from "react";
import { useTheme } from "styled-components";
import { Stock, formatStockPrice } from "../api/stocks";
import { useWalletStore } from "../hooks/useWallet";
import Button from "./Button";
import { Col, Paper, Row, StyledInput, StyledText } from "./styled";

const StockControls = (props: { stock: Stock }) => {
  const walletStocks = useWalletStore.use.stocks();
  const addStocks = useWalletStore.use.addStocks();
  const removeStocks = useWalletStore.use.removeStocks();
  const setBalance = useWalletStore.use.setBalance();
  const balance = useWalletStore.use.balance();
  const [amount, setAmount] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const theme = useTheme();

  const currentWalletStock = walletStocks.find(
    (s) => s.name === props.stock.name
  );
  const currentAmount = currentWalletStock?.amount || 0;

  const buy = () => {
    if (amount <= 0) {
      setError("Amount must be greater than 0");
      return;
    }

    if (balance < props.stock.price * amount) {
      setError("Insufficient funds");
      return;
    }
    const newBalance = balance - props.stock.price * amount;
    setBalance(newBalance);
    addStocks(props.stock.name, amount);
  };

  const sell = () => {
    if (amount <= 0) {
      setError("Amount must be greater than 0");
      return;
    }
    if (currentAmount < amount) {
      setError("Insufficient stocks");
      return;
    }
    const newBalance = balance + props.stock.price * amount;
    setBalance(newBalance);
    removeStocks(props.stock.name, amount);
  };

  const getCurrentAmountValue = () => {
    if (!amount) {
      return "";
    }
    return formatStockPrice(props.stock.price * amount);
  };

  const renderCost = () => {
    if (!amount || amount <= 0) {
      return null;
    }
    return (
      <Col alignItems="center" justifyContent="center" height="100%">
        <Row colGap={10} justifyContent="center" alignItems="center">
          <StyledText size={16}>Total cost: </StyledText>
          <StyledText size={16}>{getCurrentAmountValue()}</StyledText>
        </Row>
      </Col>
    );
  };

  return (
    <Col rowGap={10}>
      <Row colGap={20} width="250px" justifyContent="space-between">
        <StyledText size={16}>Your balance is: </StyledText>
        <StyledText size={16}>{formatStockPrice(balance)}</StyledText>
      </Row>
      <Row colGap={20} width="250px" justifyContent="space-between">
        <StyledText size={16}>You currently hold: </StyledText>
        <StyledText size={16}>{currentAmount}</StyledText>
      </Row>
      <Col paddingTop={20} justifyContent="center" alignItems="center">
        <Paper>
          <Row colGap={20}>
            <StyledInput
              type="number"
              value={amount}
              onChange={(e) => {
                setAmount(parseInt(e.target.value) ?? 0);
                setError("");
              }}
            />
            <Button onClick={buy} title="Buy" />
            <Button onClick={sell} title="Sell" color={theme.colors.red} />
            {renderCost()}
          </Row>
        </Paper>
      </Col>
      {error && (
        <Row>
          <Alert severity="error">{error}</Alert>
        </Row>
      )}
    </Col>
  );
};
export default StockControls;
