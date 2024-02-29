import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";
import Menu from "../components/Menu";
import { LayoutContainer, LayoutWrapper } from "../layout/styled";

const FullHeightPageContainer = styled.div`
  height: 100%;
  background-color: ${(props) => props.theme.bodyBackground};
  padding-top: 29px;

  @media (max-width: 720px) {
    padding-left: 0px;
    padding-right: 0px;
  }
`;

export default function Root() {
  return (
    <FullHeightPageContainer>
      <Header />
      <Menu />
      <LayoutWrapper>
        <LayoutContainer>
          <Outlet />
        </LayoutContainer>
      </LayoutWrapper>
    </FullHeightPageContainer>
  );
}
