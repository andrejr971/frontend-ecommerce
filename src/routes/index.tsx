import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Cart from '../pages/Cart';
import Landing from '../pages/Landing';
import Products from '../pages/Products';
import Product from '../pages/Products/Product';
import Profile from '../pages/Profile';
import Search from '../pages/Search';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={Landing} />
      <Route path="/login" component={SignIn} />
      <Route path="/register" component={SignUp} />

      <Route path="/products" exact component={Products} />
      <Route path="/products/:slug" component={Product} />

      <Route path="/cart" component={Cart} />
      <Route path="/profile" component={Profile} />
      <Route path="/search" component={Search} />
    </Switch>
  );
};

export default Routes;
