import { useState, useEffect, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'

import axios from 'axios'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'

import { useAppDispatch, useAppSelector } from '../../../hooks'
import { resetCart } from '../productSlice'

const Payment = () => {
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState('')

  const { cart } = useAppSelector((state) => state.product)

  const totalQty = cart.reduce((acc, cartItem) => acc + cartItem.quantity, 0)

  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const stripe = useStripe()
  const elements = useElements()

  useEffect(() => {
    if (totalQty === 0) return

    if (paymentStatus !== 'succeeded') return

    dispatch(resetCart())

    navigate('/')
  }, [dispatch, navigate, paymentStatus, totalQty])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (totalQty === 0) return

    if (!stripe || !elements) return

    const cardEl = elements.getElement(CardElement)

    setIsProcessing(true)

    try {
      const res = await axios.post(`${process.env.REACT_APP_BASE_API}/stripe`, { cart })

      const { client_secret: clientSecret } = res.data

      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardEl!
        }
      })

      if (!paymentIntent) {
        setPaymentStatus('נכשל')
      } else {
        setPaymentStatus(paymentIntent.status)
      }

    } catch (err) {
      console.error(err);
      setPaymentStatus('נכשל')
    }

    setIsProcessing(false)
  }

  return <div style={{ fontSize: '20px', width: '350px', margin: 'auto' }}>
    <form onSubmit={handleSubmit} id="payment-form">
      <label htmlFor="card-element"><h2>ביצוע הזמנה</h2></label>
      <CardElement id="card-element" />
      {
        !isProcessing && (
          <button
            style={{
              marginTop: '16px',
              height: '40px',
              backgroundColor: '#f0c14b',
              color: '#000000',
              display: 'flex',
              fontWeight: 600,
              fontSize: '20px',
              padding: '24px',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
              borderColor: '#a88734 #9c7e31 #846a29',
              borderRadius: '4px',
              width: '100%',
            }}>
            תשלום
          </button>)
      }
      {isProcessing && (<div>מעבד...</div>)}
      {!isProcessing && paymentStatus && (<div>סטטוס תשלום: {paymentStatus}</div>)}
    </form>
  </div>
}

const PaymentGateway = () => {
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY!)

  return (
    <Elements stripe={stripePromise}>
      <Payment />
    </Elements>
  )
}

export default PaymentGateway