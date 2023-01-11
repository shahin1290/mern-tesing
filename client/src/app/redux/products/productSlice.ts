import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { ProductDocument } from "../interfaces/Product";

export {};

interface ProductState {
  products: ProductDocument[] | null;
  loading: boolean;
  singleGame: ProductDocument | null;
  errors: any;
}

const initialState: ProductState = {
  products: [],
  singleGame: null,
  loading: false,
  errors: null,
};

// actions are processes that get data from backend
export const getProducts = createAsyncThunk<ProductDocument[]>(
  "products/getProducts",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("http://localhost:1337/api/posts");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<ProductDocument[]>) => {
      state.products = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.products = action.payload;
      state.loading = false;
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    });
  },
});

export const { setProducts } = productSlice.actions;

export default productSlice.reducer;
