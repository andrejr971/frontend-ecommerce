import React from 'react';
import { HiOutlineViewGrid } from 'react-icons/hi';
import formatValue from '../../utils/formatValues';

import {
  Container,
  Title,
  Content,
  Footer,
  Discount,
  ButtonShow,
  PriceReplace,
} from './styles';

interface IProduct {
  id: number;
  name: string;
  slug: string;
  price: number;
  discount?: number;
  images: {
    id: number;
    image_url: string;
    path: string;
  }[];
  priceFormatted: string;
  priceDiscount?: number;
}

interface CardProps {
  product: IProduct;
}

const Card: React.FC<CardProps> = ({ product }) => {
  return (
    <Container to={`/products/${product.slug}`}>
      <Content>
        <img src={product.images[0].image_url} alt={product.images[0].path} />
      </Content>
      <Title>
        <h3>{product.name}</h3>
      </Title>

      <Footer>
        {product.priceDiscount ? (
          <>
            <PriceReplace>{product.priceFormatted}</PriceReplace>
            <strong>{formatValue(product.priceDiscount)}</strong>
            <p>
              até
              <strong>4x</strong>
              de
              <strong>{formatValue(product.priceDiscount / 4)}</strong>
              sem juros
            </p>
          </>
        ) : (
          <>
            <strong>{product.priceFormatted}</strong>
            <p>
              até
              <strong>4x</strong>
              de
              <strong>{formatValue(product.price / 4)}</strong>
              sem juros
            </p>
          </>
        )}
      </Footer>

      {product.discount && (
        <Discount>
          <span>{`-${Number(product.discount)}%`}</span>
        </Discount>
      )}

      <ButtonShow className="open">
        Ver produto
        <HiOutlineViewGrid />
      </ButtonShow>
    </Container>
  );
};

export default Card;
