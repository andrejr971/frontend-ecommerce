import React from 'react';
import { useProducts } from '../../hooks/product';

import Card from '../../components/Card';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Slide from '../../components/Slide';

import { Container, Content, Main } from './styles';
import Loading from '../../components/Loading';

const Landing: React.FC = () => {
  const { productsHome, loading } = useProducts();

  return (
    <Container>
      <Header />
      <Slide />

      {loading && <Loading />}

      <Content>
        <h1>Destaques</h1>

        <Main>
          {productsHome.map(product => (
            <Card key={product.id} product={product} />
          ))}
        </Main>
      </Content>

      <Footer />
    </Container>
  );
};

export default Landing;
