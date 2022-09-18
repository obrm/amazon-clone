import axios from 'axios'
import { ProductDocument } from '../models'

const getProducts = async () => {
  return await axios.get<ProductDocument[]>(
    `${process.env.REACT_APP_BASE_API}/product`
  )
}

const productService = {
  getProducts,
}

export default productService
