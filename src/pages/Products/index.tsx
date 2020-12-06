import React from 'react';
import Card from '../../components/Card';
import Header from '../../components/Header';
import { useProducts } from '../../hooks/product';

import { Container, Content, Main } from './styles';

const Products: React.FC = () => {
  const { products } = useProducts();

  return (
    <Container>
      <Header />

      <Content>
        <h1>Produtos</h1>

        <Main>
          {products.map(product => (
            <Card key={product.id} product={product} />
          ))}
        </Main>
      </Content>
    </Container>
  );
};

export default Products;
