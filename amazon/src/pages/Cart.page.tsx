import { Helmet } from 'react-helmet'

import { useAppSelector } from '../hooks';
import { Product, PaymentGateway } from './../features/products/components';
import { Header } from '../shared/components';

const CartPage = () => {
  const { cart } = useAppSelector((state) => state.product)

  const totalQty = cart.reduce((acc, cartItem) => acc + cartItem.quantity, 0)
  const totalPrice = cart.reduce((acc, cartItem) => acc + cartItem.quantity * cartItem.price, 0)

  return (
    <div>
      <Helmet>
        <title>Amazon | עגלת קניות</title>
      </Helmet>
      <Header />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '48px', justifyContent: 'center', alignItems: 'center', marginTop: '48px' }}>
        {cart.length > 0 && cart.map((product) => <Product key={product._id} product={product} />)}
      </div>
      <div style={{ width: '80%', margin: 'auto' }}>
        <hr style={{ marginTop: '16px' }} />
        <div style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '20px' }}>
          <span style={{ marginLeft: '16px' }}>סיכום ביניים ({totalQty}) מוצרים:</span>
          <span style={{ marginBottom: '48px', fontWeight: 500 }}>{totalPrice.toFixed(2)} ש"ח</span>
        </div>

        {totalQty > 0 && <PaymentGateway />}
      </div>
    </div>
  )
}

export default CartPage