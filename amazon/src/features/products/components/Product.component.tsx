
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography
} from '@mui/material'

import { decrementProduct, incrementProduct } from '../productSlice'
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { ProductDocument } from './../models';

interface ProductProps {
  product: ProductDocument
}

const Product: React.FC<ProductProps> = ({ product }) => {

  const dispatch = useAppDispatch()

  const { cart } = useAppSelector((state) => state.product)

  let qty = 0

  const cartItem = cart.find((item) => item._id === product._id)

  if (cartItem) {
    qty = cartItem.quantity
  }

  return <Card sx={{ width: 300, minWidth: 300 }}>
    <CardMedia component='img' height='140' image='https://via.placeholder.com/300.png/09f/fff'
      alt='image' />
    <CardContent>
      <Typography gutterBottom variant='h4' component='div'>
        {product.name}
      </Typography>
      <Typography gutterBottom variant='h5' component='div'>
        {product.price} ש"ח
      </Typography>
      {product.description && <Typography variant='body2' color='text.secondary'>
        {product.description}
      </Typography>}
    </CardContent>
    <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Button onClick={() => {
        dispatch(decrementProduct(product))
      }} disabled={qty === 0}
        size='large'
        sx={{ fontWeight: 800 }}>
        -
      </Button>
      <span>{qty}</span>
      <Button onClick={() => {
        dispatch(incrementProduct(product))
      }}
        size='large'
        sx={{ fontWeight: 800 }}>
        +
      </Button>
    </CardActions>
  </Card>
}

export default Product