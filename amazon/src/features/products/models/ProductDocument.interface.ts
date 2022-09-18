import Product from './Product.interface'

export default interface ProductDocument extends Product {
  _id: string
  __v: number
}
