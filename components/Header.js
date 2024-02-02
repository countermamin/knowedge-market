import Link from "next/link";
import styled from "styled-components";
import Center from "@/components/Center";
import { useContext, useState } from "react";
import { CartContext } from "@/components/CartContext";
import BarsIcon from "@/components/icons/Bars";
import SearchIcon from "@/components/icons/SearchIcon";
import { useRouter } from "next/router";

const StyledHeader = styled.header`
  background-color: #222;
  position:sticky;
  top:0;
  z-index:10;
`;
const Logo = styled(Link)`
  color:#fff;
  text-decoration:none;
  position: relative;
  z-index: 3;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
`;
const StyledNav = styled.nav`
  ${props => props.mobileNavActive ? `
    display: block;
  ` : `
    display: none;
  `}
  gap: 15px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 70px 20px 20px;
  background-color: #222;
  @media screen and (min-width: 768px) {
    display: flex;
    position: static;
    padding: 0;
  }
`;
const NavLink = styled(Link)`
  display: block;
  color: ${props => props.isActive ? '#0D3D29' : '#aaa'};
  text-decoration:none;
  min-width:30px;
  padding: 10px 0;
  transition: all .3s ease-in-out;
  svg{
    height:20px;
  }
  @media screen and (min-width: 768px) {
    padding:0;
  }
  &:hover {
    color: #0D3D29;
  }
`;
const NavButton = styled.button`
  background-color: transparent;
  width: 30px;
  height: 30px;
  border:0;
  color: white;
  cursor: pointer;
  position: relative;
  z-index: 3;
  @media screen and (min-width: 768px) {
    display: none;
  }
`;
const SideIcons = styled.div`
  display: flex;
  align-items: center;
  a{
    display:inline-block;
    min-width:20px;
    color:white;
    svg{
      width:14px;
      height:14px;
    }
  }
`;

export default function Header() {
  const { cartProducts } = useContext(CartContext);
  const [mobileNavActive, setMobileNavActive] = useState(false);
  const router = useRouter();
  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <Logo href={'/'}>Ecommerce</Logo>
          <StyledNav mobileNavActive={mobileNavActive}>
            <NavLink href={'/'} isActive={router.pathname === '/'}>Главная</NavLink>
            <NavLink href={'/products'} isActive={router.pathname === '/products'}>Товары</NavLink>
            <NavLink href={'/categories'} isActive={router.pathname === '/categories'}>Категории</NavLink>
            <NavLink href={'/account'} isActive={router.pathname === '/account'}>Аккаунт</NavLink>
            <NavLink href={'/cart'} isActive={router.pathname === '/cart'}>Корзина ({cartProducts.length})</NavLink>
          </StyledNav>
          <SideIcons>
            <Link href={'/search'}><SearchIcon className={router.pathname === '/search' ? "color:#8A2BE2" : "w-6 h-6"} /></Link>
            <NavButton onClick={() => setMobileNavActive(prev => !prev)}>
              <BarsIcon />
            </NavButton>
          </SideIcons>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
}