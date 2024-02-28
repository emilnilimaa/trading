import styled from "styled-components";

const HeaderContainer = styled.div`
  height: 56px;
  background-color: ${(props) => props.theme.headerBg};
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1;
  display: flex;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <h1>Header</h1>
    </HeaderContainer>
  );
};
export default Header;
