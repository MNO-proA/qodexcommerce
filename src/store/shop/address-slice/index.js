import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  addressList: [],
  loadingAddressId: null,
  loadingType: null, 
};

export const addNewAddress = createAsyncThunk(
  "/addresses/addNewAddress",
  async (formData) => {
    const response = await axios.post(
      `${import.meta.env.VITE_SHOP_ADDRESS_API_URL}/add`,
      formData
    );

    return response.data;
  }
);

export const fetchAllAddresses = createAsyncThunk(
  "/addresses/fetchAllAddresses",
  async (userId) => {
    const response = await axios.get(
      `${import.meta.env.VITE_SHOP_ADDRESS_API_URL}/get/${userId}`
    );

    return response.data;
  }
);

export const editaAddress = createAsyncThunk(
  "/addresses/editaAddress",
  async ({ userId, addressId, formData }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_SHOP_ADDRESS_API_URL}/update/${userId}/${addressId}`,
      formData
    );

    return response.data;
  }
);

export const deleteAddress = createAsyncThunk(
  "/addresses/deleteAddress",
  async ({ userId, addressId }) => {
    const response = await axios.delete(
      `${import.meta.env.VITE_SHOP_ADDRESS_API_URL}/delete/${userId}/${addressId}`
    );

    return response.data;
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewAddress.pending, (state, action) => {
        state.isLoading = true;
        state.loadingAddressId = action.meta.arg.addressId;
      })
      .addCase(addNewAddress.fulfilled, (state) => {
        state.isLoading = false;
        state.loadingAddressId = null;
      })
      .addCase(addNewAddress.rejected, (state) => {
        state.isLoading = false;
        state.loadingAddressId = null;
      })
      // .addCase(editaAddress.pending, (state, action) => {
      //   state.isLoading = true;
      //   state.loadingAddressId = action.meta.arg.addressId;
      // })
      // .addCase(editaAddress.fulfilled, (state) => {
      //   state.isLoading = false;
      //   state.loadingAddressId = null;
      // })
      // .addCase(editaAddress.rejected, (state) => {
      //   state.isLoading = false;
      //   state.loadingAddressId = null;
      // })
      .addCase(editaAddress.pending, (state, action) => {
        state.isLoading = true;
        state.loadingAddressId = action.meta.arg.addressId;
        state.loadingType = 'edit';
      })
      .addCase(editaAddress.fulfilled, (state) => {
        state.isLoading = false;
        state.loadingAddressId = null;
        state.loadingType = null;
      })
      .addCase(editaAddress.rejected, (state) => {
        state.isLoading = false;
        state.loadingAddressId = null;
        state.loadingType = null;
      })
      .addCase(deleteAddress.pending, (state, action) => {
        state.isLoading = true;
        state.loadingAddressId = action.meta.arg.addressId;
        state.loadingType = 'delete';
      })
      .addCase(deleteAddress.fulfilled, (state) => {
        state.isLoading = false;
        state.loadingAddressId = null;
        state.loadingType = null;
      })
      .addCase(deleteAddress.rejected, (state) => {
        state.isLoading = false;
        state.loadingAddressId = null;
        state.loadingType = null;
      })
      .addCase(fetchAllAddresses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllAddresses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList = action.payload.data;
      })
      .addCase(fetchAllAddresses.rejected, (state) => {
        state.isLoading = false;
        state.addressList = [];
      });
  },
});

export default addressSlice.reducer;
