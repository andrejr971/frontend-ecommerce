import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import api from '../services/api';
import formatValue from '../utils/formatValues';
import { useToast } from './toast';

export interface IProduct {
  id: number;
  name: string;
  slug: string;
  price: number;
  priceFormatted: string;
  discount?: number;
  images: {
    id: number;
    image_url: string;
    path: string;
  }[];
  priceDiscount?: number;
}

interface ISize {
  id: number;
  size: number;
  quantity: string;
}

interface OuthersVariations {
  id: number;
  slug: string;
  name: string;
  image_url: string;
  path: string;
}

interface IProductVariation extends IProduct {
  description: string;
  sizes: ISize[];
  outhers: OuthersVariations[];
}

export interface IComment {
  id: number;
  client_id: number;
  created_at: Date;
  image_url?: string;
  comment: string;
  name: string;
  product_variation_id: number;
}

interface IProductContextData {
  products: IProduct[];
  productsHome: IProduct[];
  product: IProductVariation;
  comments: IComment[];
  loadProduct: (slug: string) => Promise<void>;
  handleComments: (data: IRequestComment) => Promise<void>;
  handleDelete: (id: number) => Promise<void>;
  loading: boolean;
}

interface IRequestComment {
  comment: string;
  product_id: number;
}

const ProductContext = createContext<IProductContextData>(
  {} as IProductContextData,
);

const ProductProvider: React.FC = ({ children }) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [productsHome, setProductsHome] = useState<IProduct[]>([]);
  const [product, setProduct] = useState<IProductVariation>(
    {} as IProductVariation,
  );
  const [comments, setComments] = useState<IComment[]>([]);
  const [loading, setLoading] = useState(false);

  const { addToast } = useToast();

  const loadData = useCallback(async () => {
    setLoading(true);

    const response = await api.get('product-variations');
    setProducts(
      response.data.map((formatProduct: Omit<IProduct, 'priceFormatted'>) => ({
        ...formatProduct,
        priceFormatted: formatValue(formatProduct.price),
        priceDiscount: formatProduct.discount
          ? formatProduct.price -
            formatProduct.price * (formatProduct.discount / 100)
          : null,
      })),
    );

    setProductsHome(response.data);
    setLoading(false);
  }, []);

  const loadProduct = useCallback(async (slug: string) => {
    setLoading(true);
    const response = await api.get(`product-variations/${slug}`);
    const { data } = await api.get(`comments/${response.data.id}`);

    setProduct({
      ...response.data,
      priceFormatted: formatValue(response.data.price),
      priceDiscount: response.data.discount
        ? response.data.price -
          response.data.price * (response.data.discount / 100)
        : null,
    });

    setComments(data);
    setLoading(false);
  }, []);

  const handleComments = useCallback(
    async (data: IRequestComment) => {
      const response = await api.post('comments', data);

      const arrayComments = comments;
      arrayComments.unshift(response.data);

      addToast({
        type: 'success',
        title: 'Obrigado pelo comentário',
      });

      setComments(arrayComments);
    },
    [comments, addToast],
  );

  const handleDelete = useCallback(
    async (id: number) => {
      await api.delete(`comments/${id}`);

      addToast({
        type: 'success',
        title: 'Comentário deletado',
      });

      const arrayComments = comments.filter(comment => comment.id !== id);

      setComments(arrayComments);
    },
    [comments, addToast],
  );

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <ProductContext.Provider
      value={{
        products,
        loadProduct,
        product,
        comments,
        handleComments,
        handleDelete,
        productsHome,
        loading,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

function useProducts(): IProductContextData {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error('useProducts must be used within as ProductProvider');
  }

  return context;
}

export { ProductProvider, useProducts };
