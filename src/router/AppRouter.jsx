import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from '../ui/layout'
import { AuthPage } from '../modules/auth/AuthPage'
import { ProductPage } from '../modules/product/ProductPage'
import { CustomersPage } from '../modules/customers/CustomerPage'
import { OrdersPage } from '../modules/orders/OrderPage'


export const AppRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='usuarios' element={<AuthPage />} />
        <Route path='pedidos' element={<OrdersPage />} />
        <Route path='productos' element={<ProductPage />} />
        <Route path='clientes' element={<CustomersPage />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Route>
    </Routes>
  )
}
