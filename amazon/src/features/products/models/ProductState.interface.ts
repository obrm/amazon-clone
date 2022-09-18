import { AsyncState } from '../../../shared/models'
import { Cart } from './Cart'
import ProductDocument from './ProductDocument.interface'

export default interface ProductState extends AsyncState {
  products: ProductDocument[]
  cart: Cart
}
