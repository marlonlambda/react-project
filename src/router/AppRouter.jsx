import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from '../ui/layout';
import { ProductPage } from '../modules/product/ProductPage';
import { CustomersPage } from '../modules/customers/CustomerPage';
import { OrdersPage } from '../modules/orders/OrderPage';
import { CategoryPage } from '../modules/category/CategoryPage';
import { UserPage } from '../modules/users/UsersPage';
import { useAuthStore } from '../modules/auth/hooks/useAuthStore';
import { AuthPage } from '../modules/auth/AuthPage';
import { Spinner } from '@heroui/react';

export const AppRouter = () => {
  const { status, checkoutToken } = useAuthStore();

  useEffect(() => {
    checkoutToken();
  }, []);

  if (status === 'checking') {
    return <div className='w-full h-screen flex justify-center items-center'>      
            <Spinner size='lg' classNames={{ label: "text-foreground mt-4" }} variant="wave" />
          </div>;
  }

  return (
    <Routes>
      {
        (status === 'not-authenticated') ?
          (
            <>
              <Route path='/auth/*' element={<AuthPage />} />
              <Route path='/*' element={<Navigate to='/auth/login' />} />
            </>
          ) :
          (
            <Route path='/' element={<Layout />}>
              <Route path='usuarios' element={<UserPage />} />
              <Route path='categories' element={<CategoryPage />} />
              <Route path='pedidos' element={<OrdersPage />} />
              <Route path='productos' element={<ProductPage />} />
              <Route path='clientes' element={<CustomersPage />} />
              <Route path='*' element={<Navigate to='/pedidos' />} />
            </Route>
          )
      }
    </Routes>
  );
};