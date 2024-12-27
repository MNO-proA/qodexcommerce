import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  isLoading: false,
  loadingProductId: null,
};

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, productId, quantity }) => {
    const response = await axios.post(
      `${import.meta.env.VITE_SHOP_CART_API_URL}/add`,
      {
        userId,
        productId,
        quantity,
      }
    );

    return response.data;
  }
);

export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (userId) => {
    const response = await axios.get(
      `${import.meta.env.VITE_SHOP_CART_API_URL}/get/${userId}`
    );

    return response.data;
  }
);

export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async ({ userId, productId }) => {
    const response = await axios.delete(
      `${import.meta.env.VITE_SHOP_CART_API_URL}/${userId}/${productId}`
    );

    return response.data;
  }
);

export const updateCartQuantity = createAsyncThunk(
  "cart/updateCartQuantity",
  async ({ userId, productId, quantity }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_SHOP_CART_API_URL}/update-cart`,
      {
        userId,
        productId,
        quantity,
      }
    );

    return response.data;
  }
);

const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state, action) => {
        state.isLoading = true;
        state.loadingProductId = action.meta.arg.productId; //
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
        state.loadingProductId = null;
      })
      .addCase(addToCart.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
        state.loadingProductId = null;
      })
      .addCase(fetchCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(fetchCartItems.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(updateCartQuantity.pending, (state, action) => {
        state.isLoading = true;
        state.loadingProductId = action.meta.arg.productId;
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
        state.loadingProductId = null;
      })
      .addCase(updateCartQuantity.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
        state.loadingProductId = null;
      })
      .addCase(deleteCartItem.pending, (state, action) => {
        state.isLoading = true;
        state.loadingProductId = action.meta.arg.productId;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
        state.loadingProductId = null;
      })
      .addCase(deleteCartItem.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
        state.loadingProductId = null;
      });
  },
});

export default shoppingCartSlice.reducer;
