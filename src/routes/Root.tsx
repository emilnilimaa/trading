import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";

const FullHeightPageContainer = styled.div`
  height: 100%;
  background-color: ${(props) => props.theme.bodyBackground};
  //margin-top: -56px;
  padding-top: 56px;
  //padding-left: 20px;
  //padding-right: 20px;

  @media (max-width: 720px) {
    padding-left: 0px;
    padding-right: 0px;
  }
`;

export default function Root() {
  return (
    <FullHeightPageContainer>
      <Header />
      <Outlet />
    </FullHeightPageContainer>
  );
}
