import { Alert, TextField } from "@mui/material";
import { useState } from "react";
import Button from "../components/Button";
import { Col, H1, Row, StyledText } from "../components/styled";
import { useAuthStore } from "../hooks/useAuth";
import { PageWrapper } from "../layout/styled";

const LoginPage = () => {
  const setAuthenticated = useAuthStore.use.setAuthenticated();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = () => {
    console.log("login performed");

    if (username === "demo" && password === "demo") {
      setError("");
      setAuthenticated(true);
      window.location.href = "/";
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <PageWrapper>
      <Col rowGap={20}>
        <Row>
          <H1>Login</H1>
        </Row>
        <Row>
          <Col rowGap={0}>
            <StyledText>Enter your username and password to login</StyledText>
            <StyledText size={12}>(username: demo password: demo)</StyledText>
          </Col>
        </Row>

        <Col rowGap={20}>
          <Row>
            <TextField
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              label="Email"
              variant="standard"
            />
          </Row>
          <Row>
            <TextField
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              label="Password"
              variant="standard"
              type="password"
            />
          </Row>
          <Row>
            <Button title="Login" onClick={login} />
          </Row>
        </Col>

        {error && (
          <Row>
            <Alert severity="error">
              <StyledText>{error}</StyledText>
            </Alert>
          </Row>
        )}
      </Col>
    </PageWrapper>
  );
};
export default LoginPage;
