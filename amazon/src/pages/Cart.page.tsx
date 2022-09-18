import { useState } from 'react';
import { Helmet } from 'react-helmet'
import { useAppDispatch, useAppSelector } from '../hooks';


import { Header } from './../features/products/components';

const CartPage = () => {
  const { cart, products } = useAppSelector((state) => state.product)

  const dispatch = useAppDispatch()

  return (
    <div>
      <Helmet>
        <title>Amazon | עגלת קניות</title>
      </Helmet>
      <Header />
    </div>
  )
}

export default CartPage