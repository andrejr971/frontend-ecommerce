import React, { useCallback, useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import Card from '../../components/Card';
import Header from '../../components/Header';
import { IProduct } from '../../hooks/product';
import api from '../../services/api';

import { Container, Main, Content } from './styles';

const Search: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [search, setSearch] = useState('');

  const handleSearch = useCallback(async () => {
    const response = await api.get('search', {
      params: {
        q: search,
      },
    });

    setProducts(response.data);
  }, [search]);

  useEffect(() => {
    if (search !== '') {
      handleSearch();
    } else {
      setProducts([]);
    }
  }, [search, handleSearch]);

  return (
    <Container>
      <Header />

      <Content>
        <header>
          <div>
            <FiSearch />
            <input
              type="text"
              value={search}
              onChange={({ target }) => setSearch(target.value)}
              placeholder="Nome ou categoria"
            />
          </div>
        </header>

        <h1>{search ? `Você pesquisou por: ${search}` : 'Pesquisa'}</h1>

        <Main>
          {products &&
            products.map(product => (
              <Card key={product.id} product={product} />
            ))}
        </Main>
      </Content>
    </Container>
  );
};

export default Search;
