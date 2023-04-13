import { createSlice } from '@reduxjs/toolkit';

export const cartslice = createSlice({
  name: 'cart',
  initialState: {
    cart: 0,
    cart1: 0,
    products: [],
    products1: []
  },
  reducers: {
    updateCart: (state, action) => {
      state.cart = action.payload + 1;
    }, updateCart1: (state, action) => {
      state.cart1 = action.payload + 1;
    },
    cartProduct: (state, action) => {
      console.log("added product is",action.payload);
      state.products.push(action.payload)
    },
    saveItem: (state, action) => {
      console.log("added product is",action.payload);
      state.products1.push(action.payload)
    },
    removeItem: ( state, action) => {
      console.log(action);
      state.products.splice(action.payload,1);
      state.cart = state.cart-1; 
    },
    removeItem1: ( state, action) => {
      console.log(action);
      state.products1.splice(action.payload,1);
      state.cart1 = state.cart1-1; 
    },
    updateItem: ( state, action) => {
      console.log(action);
      state.products.findIndex(action , 1);
    
    }
    
  }
});

// this is for dispatch
export const {updateCart,updateCart1, cartProduct, removeItem, removeItem1,updateItem, saveItem } = cartslice.actions;

// this is for configureStore
export default cartslice.reducer;