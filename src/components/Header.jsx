import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import logoImg from "../assets/logo.png";

const HeaderWrapper = styled.header`
  width: 100%;
  height: 100px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  box-sizing: border-box;
  border-bottom: 1px solid #e0e0e0;
`;

const LogoImg = styled.img`
  height: 48px;
  object-fit: contain;
  cursor: pointer;
  transform: translateY(-6px);
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 32px;
`;

const NavItem = styled.span`
  color: #000;
  font-family: "S-Core Dream", sans-serif;
  font-size: 28px;
  font-style: normal;
  font-weight: ${({ $active }) => ($active ? 500 : 200)};
  line-height: normal;
  text-decoration: none;
  cursor: pointer;
`;

export default function Header() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <HeaderWrapper>
      <LogoImg src={logoImg} alt="logo" onClick={() => navigate("/")} />
      <Nav>
        <NavItem $active={pathname === "/main"} onClick={() => navigate("/main")}>Home</NavItem>
        <NavItem $active={pathname === "/wishlist"} onClick={() => navigate("/wishlist")}>Wishlist</NavItem>
        <NavItem $active={pathname === "/mypage"} onClick={() => navigate("/mypage")}>My page</NavItem>
      </Nav>
    </HeaderWrapper>
  );
}
