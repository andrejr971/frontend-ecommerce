import React, { useEffect } from 'react';
import { FiLogIn, FiLogOut, FiSearch, FiShoppingCart } from 'react-icons/fi';

import { Link, useRouteMatch } from 'react-router-dom';
import logoImg from '../../assets/logo.png';
import favicoImg from '../../assets/favicon.png';

import {
  Container,
  Content,
  Logo,
  Nav,
  Right,
  ButtonLogin,
  Cart,
  Search,
  ButtonLogout,
  Profile,
} from './styles';
import { useAuth } from '../../hooks/auth';
import { useCart } from '../../hooks/cart';

const Header: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const HandleRoute = (active: boolean, to: string) => {
    const match = useRouteMatch({
      path: to,
      exact: active,
    });

    return match ? 'active' : '';
  };

  const { user, signOut } = useAuth();
  const { cart } = useCart();

  // document.addEventListener('scroll', () => {
  //   const scroll = window.scrollY;

  //   if (scroll <= 30) {
  //     setIsColor(false);
  //   } else {
  //     setIsColor(true);
  //   }
  // });

  return (
    <Container>
      <Content>
        <Logo to="/">
          <img src={logoImg} alt="Logo Dreshoes" />

          <div>
            <img src={favicoImg} alt="Logo Dreshoes" />
          </div>
        </Logo>

        <Nav>
          <ul>
            <li>
              <Link to="/" className={HandleRoute(true, '/')}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/products" className={HandleRoute(false, '/products')}>
                Produtos
              </Link>
            </li>
          </ul>
        </Nav>

        <Right>
          <Search to="/search">
            <FiSearch />
          </Search>
          <Cart to="/cart">
            {cart && cart.length > 0 && <span>{cart.length}</span>}
            <FiShoppingCart />
          </Cart>

          {user ? (
            <>
              <Profile to="/profile">
                <img
                  src={
                    user.avatar_url
                      ? user.avatar_url
                      : `https://ui-avatars.com/api/?name=${user.name}&background=1b1b1b&color=fff&bold=true&format=svg&size=110`
                  }
                  alt={user.name}
                />

                <strong>{user.name}</strong>
              </Profile>

              <ButtonLogout type="button" onClick={signOut}>
                <span>Sair</span>
                <FiLogOut />
              </ButtonLogout>
            </>
          ) : (
            <ButtonLogin to="/login">
              <span>Login</span>
              <FiLogIn />
            </ButtonLogin>
          )}
        </Right>
      </Content>
    </Container>
  );
};

export default Header;
