import React from 'react';
import { AuthProvider } from './auth';
import { CartProvider } from './cart';
import { ProductProvider } from './product';
import { ToastProvider } from './toast';

const AppProvider: React.FC = ({ children }) => {
  return (
    <ToastProvider>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>{children}</CartProvider>
        </ProductProvider>
      </AuthProvider>
    </ToastProvider>
  );
};

export default AppProvider;
