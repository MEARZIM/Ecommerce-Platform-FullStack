import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


import { fetchAllProducts, fetchProductsByFilter } from "./ProductApi"
import { RootState } from "../../app/store";
import { Product } from "../../app/interfaces";


interface ProductState {
    products: Product[]
    totalItems: number,
    status: string,
}

const initialState: ProductState = {
    products: [],
    totalItems: 0,
    status: "",
}

export const fetchAllProductsAsync = createAsyncThunk('product/fetchAllProducts',
    async () => {
        const responce:any = await fetchAllProducts();
        // console.log(responce)
        return responce; 
    }
)

export const fetchProductsByFilterAsync = createAsyncThunk('product/fetchProductsByFilter',
    async ({filter, sort, pagination}: any) => {
        const responce:any = await fetchProductsByFilter(filter, sort, pagination);
        // console.log(responce);

        if(pagination){
  return responce.data.data; 
        }
        return responce.data; 
    }
)

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        increment: (state) => {
            console.log(state.products)
            state.products ;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllProductsAsync.pending, (state) => {
                state.status = "loading"
            })
            .addCase (fetchAllProductsAsync.fulfilled, (state, action) => {
                state.status = "idle",
                state.totalItems = action.payload;
            })
            .addCase(fetchProductsByFilterAsync.pending, (state) => {
                state.status = "loading"
            })
            .addCase (fetchProductsByFilterAsync.fulfilled, (state, action) => {
                state.status = "idle",
                state.products = action.payload
            })
    }
})


  

export const {
    increment
} = productSlice.actions;

export const selectAllProducts  =  (state:RootState ) => state.product.products as Product[];
export const selectTotalItems = (state:RootState) => state.product.totalItems as number;

export default productSlice.reducer;

