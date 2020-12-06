import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  FiMessageSquare,
  FiSend,
  FiShoppingCart,
  FiTruck,
} from 'react-icons/fi';
import { Link, useParams } from 'react-router-dom';
import Button from '../../../components/Button';
import Footer from '../../../components/Footer';
import Header from '../../../components/Header';

import TextArea from '../../../components/TextArea';
import { ICart, useCart } from '../../../hooks/cart';
import { useProducts } from '../../../hooks/product';
import formatValue from '../../../utils/formatValues';
import Comment from './Comment';
import ContentImages from './ContentImages';

import {
  Container,
  Content,
  Description,
  Images,
  ContentDescription,
  PriceReplace,
  AsideRigth,
  Prices,
  ContentAside,
  ContentSizes,
  ButtonBuy,
  DescriptionProduct,
  Comments,
} from './styles';

interface IParams {
  slug: string;
}

interface ISize {
  id: number;
  size: number;
  quantity: string;
}

interface IRequest {
  comment: string;
}

const Product: React.FC = () => {
  const { slug } = useParams<IParams>();

  const { loadProduct, product, comments, handleComments } = useProducts();
  const { cart, handleAddToCart } = useCart();

  const [sizeSelected, setSizeSelected] = useState<ISize>({} as ISize);
  const [productCart, setProductCart] = useState<ICart>({} as ICart);

  const formRef = useRef<FormHandles>(null);

  useEffect(() => {
    loadProduct(slug);
  }, [slug, loadProduct]);

  useEffect(() => {
    if (product.sizes) {
      setSizeSelected(product.sizes[0]);
    }
  }, [slug, product.sizes]);

  useEffect(() => {
    setProductCart({
      id: cart[0] ? cart[cart.length - 1].id + 1 : 1,
      product_id: product.id,
      name: product.name,
      slug: product.slug,
      quantity: 1,
      size: sizeSelected.size,
      image_url: product.images && product.images[0].image_url,
      price: product.price,
      priceFormatted: product.priceFormatted,
      discount: product.discount,
      priceDiscount: product.priceDiscount,
      size_id: sizeSelected.id,
    });
  }, [product, cart, sizeSelected]);

  const handleCart = useCallback(async () => {
    await handleAddToCart(productCart);
  }, [handleAddToCart, productCart]);

  const descriptionRef = useRef(null);

  const handleSelectedSeize = useCallback(
    (id: number) => {
      const findSize = product.sizes.find(size => size.id === id);

      if (!findSize) return;

      setSizeSelected(findSize);
    },
    [product.sizes],
  );

  const handleSubmit = useCallback(
    async (data: IRequest) => {
      await handleComments({
        comment: data.comment,
        product_id: product.id,
      });

      formRef.current?.reset();
    },
    [handleComments, product],
  );

  return (
    <Container>
      <Header />

      {!!product && (
        <>
          <Content>
            <Description>
              <ContentDescription>
                <h1>{product.name}</h1>
                <p>
                  {product.description && product.description.substr(0, 200)}
                  ...
                  <a href="#about">Ler mais</a>
                </p>
              </ContentDescription>

              <Images>
                {product.images && (
                  <ContentImages
                    images={product.images}
                    discount={product.discount}
                  />
                )}
              </Images>
            </Description>

            <AsideRigth>
              <header>
                <strong>
                  <FiTruck />
                  FRETE GRÁTIS
                </strong>
              </header>

              <Prices>
                {product.priceDiscount ? (
                  <>
                    <strong>{formatValue(product.priceDiscount)}</strong>
                    <PriceReplace>{product.priceFormatted}</PriceReplace>
                    <p>
                      Economia de
                      <span>
                        {formatValue(product.price - product.priceDiscount)}
                      </span>
                      <span>{`(${Number(product.discount)}%)`}</span>
                      <br />
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
              </Prices>

              {product.outhers && (
                <ContentAside>
                  <h3>Cores</h3>

                  <ul>
                    {product.outhers.map(outher => (
                      <li key={outher.id}>
                        <Link
                          to={`/products/${outher.slug}`}
                          className={outher.id === product.id ? 'selected' : ''}
                        >
                          <img src={outher.image_url} alt={outher.name} />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </ContentAside>
              )}

              {product.sizes && (
                <ContentSizes>
                  <h3>Tamanhos</h3>

                  <ul>
                    {product.sizes.map(size => (
                      <li key={size.id}>
                        {size.quantity === '0' ? (
                          <button type="button" disabled>
                            {size.size}
                          </button>
                        ) : (
                          <button
                            type="button"
                            className={
                              sizeSelected.id === size.id ? 'active' : ''
                            }
                            onClick={() => handleSelectedSeize(size.id)}
                          >
                            {size.size}
                          </button>
                        )}
                      </li>
                    ))}
                  </ul>
                </ContentSizes>
              )}

              <ButtonBuy type="button" onClick={handleCart}>
                Adicionar ao carrinho
                <FiShoppingCart />
              </ButtonBuy>
            </AsideRigth>
          </Content>

          <DescriptionProduct ref={descriptionRef} id="about">
            <h2>Descrição</h2>
            <p>{product.description}</p>

            <ul>
              <li>
                <strong>Nome:</strong>
                <span>{product.name}</span>
              </li>
              <li>
                <strong>Gênero:</strong>
                <span>Feminino</span>
              </li>
              <li>
                <strong>Marca:</strong>
                <span>Nike</span>
              </li>
            </ul>
          </DescriptionProduct>

          {comments && (
            <Comments>
              <h2>
                Avaliações os clientes
                {` (${comments.length})`}
              </h2>

              <Form onSubmit={handleSubmit} ref={formRef}>
                <TextArea
                  name="comment"
                  icon={FiMessageSquare}
                  placeholder="Insira um comentário"
                  required
                />
                <Button type="submit">
                  <FiSend />
                </Button>
              </Form>

              {comments.length === 0 ? (
                <p>Nenhum comentário feito sobre este produto</p>
              ) : (
                <ul>
                  {comments.map(comment => (
                    <Comment key={comment.id} comment={comment} />
                  ))}
                </ul>
              )}
            </Comments>
          )}
        </>
      )}
      <Footer />
    </Container>
  );
};

export default Product;
