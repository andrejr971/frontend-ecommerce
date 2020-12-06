import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import api from '../services/api';
import formatValue from '../utils/formatValues';
import { useAuth } from './auth';
import { useToast } from './toast';

export interface ICart {
  id: number;
  product_id: number;
  name: string;
  slug: string;
  quantity: number;
  size: number;
  price: number;
  size_id?: number;
  discount?: number;
  image_url: string;
  priceFormatted: string;
  priceDiscount?: number;
}

interface ITotals {
  subtotal: string;
  discount: string;
  total: string;
  quantity: number;
}

interface ICartContextData {
  cart: ICart[];
  totals: ITotals;
  handleAddToCart(item: ICart): Promise<void>;
  handleDeleteToCart(id: number): Promise<void>;
  handleAdd(id: number): Promise<void>;
  handleRemove(id: number): Promise<void>;
}

const CartContext = createContext<ICartContextData>({} as ICartContextData);

const CartProvider: React.FC = ({ children }) => {
  const [cart, setCart] = useState<ICart[]>([]);

  const { addToast } = useToast();

  const [totals, setTotals] = useState<ITotals>({
    discount: 'R$ 0,00',
    subtotal: 'R$ 0,00',
    total: 'R$ 0,00',
    quantity: 0,
  });

  const { user } = useAuth();

  const handleValues = useCallback((items: ICart[]) => {
    const { subtotal, quantity, total } = items.reduce(
      (accumulator, item) => {
        if (item.discount) {
          accumulator.subtotal +=
            (item.price - item.price / item.discount) * item.quantity;
          accumulator.total +=
            (item.price - item.price / item.discount) * item.quantity;
        } else {
          accumulator.subtotal += item.price * item.quantity;
          accumulator.total += item.price * item.quantity;
        }

        accumulator.quantity += item.quantity;

        return accumulator;
      },
      {
        subtotal: 0,
        quantity: 0,
        total: 0,
      },
    );

    setTotals({
      discount: formatValue(0),
      total: formatValue(total),
      subtotal: formatValue(subtotal),
      quantity,
    });
  }, []);

  const loadData = useCallback(async () => {
    const response = await api.get('cart/show');

    if (response.data.lenght > 0) {
      setCart(
        response.data.map((data: ICart) => ({
          ...data,
          quantity: Number(data.quantity),
          priceFormatted: formatValue(data.price),
          priceDiscount: data.discount
            ? data.price - data.price / data.discount
            : null,
        })),
      );

      handleValues(response.data);
    }
  }, [handleValues]);

  const handleAdd = useCallback(
    async (id: number) => {
      const findIndex = cart.findIndex(findItem => findItem.id === id);

      if (findIndex === -1) {
        addToast({
          type: 'error',
          title: 'Item não encontrado',
        });
        return;
      }

      cart[findIndex].quantity += 1;
      const arrayCart = cart;

      if (user) {
        await api.put(`cart/add/${id}`);
      }

      setCart(arrayCart);
      handleValues(arrayCart);
    },
    [cart, addToast, handleValues, user],
  );

  const handleAddToCart = useCallback(
    async (item: ICart) => {
      const findIndex = cart.findIndex(
        findItem =>
          findItem.product_id === item.product_id &&
          findItem.size === item.size,
      );

      if (findIndex > -1) {
        handleAdd(cart[findIndex].id);
        return;
      }

      if (user) {
        const { data } = await api.post('cart', {
          id: item.product_id,
          quantity: 1,
          size: item.size_id,
        });

        const newItem = {
          ...data,
          quantity: Number(data.quantity),
          priceFormatted: formatValue(data.price),
          priceDiscount: data.discount
            ? data.price - data.price / data.discount
            : null,
        };

        setCart([...cart, newItem]);
      } else {
        setCart([...cart, item]);
      }

      addToast({
        type: 'success',
        title: 'Item adicionado ao carrinho',
      });
    },
    [cart, addToast, user, handleAdd],
  );

  const handleRemove = useCallback(
    async (id: number) => {
      const findIndex = cart.findIndex(findItem => findItem.id === id);

      if (findIndex === -1) {
        addToast({
          type: 'error',
          title: 'Item não encontrado',
        });
        return;
      }

      cart[findIndex].quantity -= 1;
      const arrayCart = cart;

      if (user) {
        await api.put(`cart/remove/${id}`);
      }

      setCart(arrayCart);
      handleValues(arrayCart);
    },
    [cart, addToast, handleValues, user],
  );

  const handleDeleteToCart = useCallback(
    async (id: number) => {
      const findIndex = cart.findIndex(findItem => findItem.id === id);

      if (findIndex === -1) {
        addToast({
          type: 'error',
          title: 'Item não encontrado',
        });
        return;
      }

      await api.delete(`cart/${id}`);

      const filterCart = cart.filter(findItem => findItem.id !== id);

      setCart(filterCart);

      addToast({
        type: 'success',
        title: 'Item removido ao carrinho',
      });
    },
    [cart, addToast],
  );

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [loadData, user]);

  useEffect(() => {
    if (!user) {
      setCart([]);
    }
  }, [user]);

  useEffect(() => {
    handleValues(cart);
  }, [cart, handleValues]);

  return (
    <CartContext.Provider
      value={{
        cart,
        totals,
        handleAddToCart,
        handleDeleteToCart,
        handleAdd,
        handleRemove,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

function useCart(): ICartContextData {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within as CartProvider');
  }

  return context;
}

export { CartProvider, useCart };
