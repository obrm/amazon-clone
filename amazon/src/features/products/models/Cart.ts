import ProductDocument from './ProductDocument.interface'

export interface CartItem extends ProductDocument {
  quantity: number
}

export type Cart = CartItem[]
