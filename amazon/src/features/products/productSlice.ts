import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Cart, ProductState, ProductDocument } from './models'
import productService from './services/product.service'

const storedCart: string | null = localStorage.getItem('cart')
const cart: Cart = !!storedCart ? JSON.parse(storedCart) : []

const initialState: ProductState = {
  products: [],
  cart,
  isLoading: false,
  isSuccess: false,
  isError: false,
}

export const getProducts = createAsyncThunk('product', async () => {
  try {
    return await productService.getProducts()
  } catch (err) {
    console.error('Error: ', err)
  }
})

const modifyQtyByOne = (
  cart: Cart,
  selectedProduct: ProductDocument,
  modificationType: 'INCREMENT' | 'DECREMENT'
): Cart => {
  const previousCart = [...cart]
  const productInCart = previousCart.find(
    (product) => product._id === selectedProduct._id
  )

  let newCart = []

  if (!productInCart) {
    previousCart.push({ ...selectedProduct, quantity: 1 })

    newCart = previousCart
  } else {
    const filteredCart = previousCart.filter((p) => p._id !== productInCart._id)

    const modification = modificationType === 'INCREMENT' ? 1 : -1

    productInCart.quantity += modification

    if (productInCart.quantity === 0) {
      newCart = [...filteredCart]
    } else {
      newCart = [...filteredCart, productInCart]
    }
  }

  localStorage.setItem('cart', JSON.stringify(newCart))

  return newCart
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    incrementProduct: (state, action: PayloadAction<ProductDocument>) => {
      const modifiedCart = modifyQtyByOne(
        state.cart,
        action.payload,
        'INCREMENT'
      )
      state.cart = modifiedCart
    },
    decrementProduct: (state, action: PayloadAction<ProductDocument>) => {
      const modifiedCart = modifyQtyByOne(
        state.cart,
        action.payload,
        'DECREMENT'
      )
      state.cart = modifiedCart
    },
    resetCart: (state) => {
      state.cart = []
      localStorage.removeItem('cart')
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.products = action.payload?.data || []
      })
      .addCase(getProducts.rejected, (state) => {
        state.isLoading = false
        state.isError = true
        state.products = []
      })
  },
})

export const { incrementProduct, decrementProduct, resetCart } =
  productSlice.actions

export default productSlice.reducer
