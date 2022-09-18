import { useEffect } from 'react'

import { Helmet } from 'react-helmet'

import { getProducts } from '../features/products/productSlice';
import { useAppDispatch, useAppSelector } from '../hooks';
import { Header } from './../features/products/components';
import { Product } from './../features/products/components';

const HomePage = () => {
  const { products } = useAppSelector((state) => state.product)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch])


  return <div>
    <Helmet>
      <title>Amazon | בית</title>
    </Helmet>
    <Header />
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '48px', justifyContent: 'center', alignItems: 'center', marginTop: '48px' }}>
      {products.length > 0 && products.map((product) => <Product key={product._id} product={product} />)}
    </div>
  </div>
}

export default HomePage
