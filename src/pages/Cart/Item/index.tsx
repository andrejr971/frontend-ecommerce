import React, { useCallback, useState } from 'react';
import { FiMinus, FiPlus, FiTrash } from 'react-icons/fi';
import { ICart, useCart } from '../../../hooks/cart';
import formatValue from '../../../utils/formatValues';

import {
  Container,
  DescriptionItem,
  FooterItem,
  Quantity,
  PriceItem,
  PriceReplace,
  ButtonDelete,
} from './styles';

interface ItemProps {
  item: ICart;
}

const Item: React.FC<ItemProps> = ({ item }) => {
  const { handleDeleteToCart, handleAdd, handleRemove } = useCart();
  const [quantity, setQuantity] = useState(item.quantity);

  const handleAddQuantity = useCallback(async () => {
    await handleAdd(item.id);
    setQuantity(quantity + 1);
  }, [handleAdd, quantity, item]);

  const handleRemoveQuantity = useCallback(async () => {
    await handleRemove(item.id);
    setQuantity(quantity - 1);
  }, [handleRemove, quantity, item]);

  return (
    <Container>
      <ButtonDelete type="button" onClick={() => handleDeleteToCart(item.id)}>
        <FiTrash />
      </ButtonDelete>

      <DescriptionItem>
        <img src={item.image_url} alt={item.name} />
        <ul>
          <li>
            <h4>{item.name}</h4>
          </li>
          <li>
            <strong>Tamanho: </strong>
            <span>{item.size}</span>
          </li>
        </ul>
      </DescriptionItem>

      <FooterItem>
        <Quantity>
          <strong>Quantidade: </strong>
          {quantity === 1 ? (
            <button
              type="button"
              onClick={() => handleRemove(item.id)}
              disabled
            >
              <FiMinus />
            </button>
          ) : (
            <button type="button" onClick={handleRemoveQuantity}>
              <FiMinus />
            </button>
          )}
          <span>{quantity}</span>
          <button type="button" onClick={handleAddQuantity}>
            <FiPlus />
          </button>
        </Quantity>

        <PriceItem>
          {item.priceDiscount ? (
            <>
              <PriceReplace>{item.priceFormatted}</PriceReplace>
              <strong>{formatValue(item.priceDiscount * quantity)}</strong>
            </>
          ) : (
            <strong>{formatValue(item.price * quantity)}</strong>
          )}
        </PriceItem>
      </FooterItem>
    </Container>
  );
};

export default Item;
