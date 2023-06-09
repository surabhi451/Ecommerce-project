import { createSlice } from '@reduxjs/toolkit';
export const cartslice = createSlice({
  name: 'cart',
  initialState: {
    cart: 0,
    cartSave: 0,
    quantity: 0,
    products: [],
    productsSave: [],
    itemQuantity: [],
  },
  reducers: {
    updateCart: (state, action) => {
      state.cart = action.payload + 1;
    },
    updateCartSave: (state, action) => {
      state.cart1 = action.payload + 1;
    },
    cartProduct: (state, action) => {
      console.log("added product is", action.payload);
      state.products.push(action.payload);
      state.itemQuantity.push(1);
    },
    saveItem: (state, action) => {
      console.log("added product is", action.payload);
      state.products1.push(action.payload)
    },
    removeItem: (state, action) => {
      console.log(action);
      state.products.splice(action.payload, 1);
      state.cart = state.cart - 1;
    },
    removeItemSave: (state, action) => {
      console.log(action);
      state.products1.splice(action.payload, 1);
      state.cart1 = state.cart1 - 1;
    },
    updateItem: (state, action) => {
      console.log(action);
      state.products.findIndex(action, 1);
    },
    incQuantity: (state, action) => {
      console.log("inside quantity increment", action);
      const currVal = state.itemQuantity[action.payload] + 1;
      console.log("currentvalue", currVal)
      state.itemQuantity.splice(action.payload, 1, currVal);
    },
    decQuantity: (state, action) => {
      console.log("inside quantity increment", action);
      const currVal = state.itemQuantity[action.payload] - 1;
      console.log("currentvalue", currVal)
      state.itemQuantity.splice(action.payload, 1, currVal);
    }
  }
});
export const { updateCart, updateCartSave, cartProduct, removeItem, removeItemSave, updateItem, saveItem, incQuantity, decQuantity } = cartslice.actions;
export default cartslice.reducer;