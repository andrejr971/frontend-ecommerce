import React from 'react';

import Header from '../../components/Header';
import { useCart } from '../../hooks/cart';
import Item from './Item';

import { Container, Content, ItemsCart, ResumeCart } from './styles';

const Cart: React.FC = () => {
  const { cart, totals } = useCart();

  return (
    <Container>
      <Header />

      <Content>
        <ItemsCart>
          <h2>Meu carrinho</h2>
          {cart && cart.length > 0 ? (
            <ul>
              {cart.map(item => (
                <Item key={item.id} item={item} />
              ))}
            </ul>
          ) : (
            <p>O seu carrinho está vazio</p>
          )}
        </ItemsCart>
        <ResumeCart>
          <h2>Resumo da compra</h2>
          <ul>
            <li>
              <strong>
                Subtotal
                <span>
                  {`(${totals.quantity} ${
                    totals.quantity <= 1 ? 'item' : 'items'
                  })`}
                </span>
              </strong>

              <span>{totals.subtotal}</span>
            </li>
            <li>
              <strong>Desconto</strong>
              <span>{totals.discount}</span>
            </li>
            <li>
              <strong>Total</strong>
              <span>{totals.total}</span>
            </li>
          </ul>

          <button type="button">Finalizar compra</button>
        </ResumeCart>
      </Content>
    </Container>
  );
};

export default Cart;
