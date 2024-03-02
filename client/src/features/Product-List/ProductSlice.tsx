import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
    fetchAllProducts,
    fetchProductsByFilter,
    fetchAllbrands,
    fetchAllCategories
} from "./ProductApi"
import {
    Product,
    BrandsList,
    CategoriesList
} from "../../app/interfaces";
import { RootState } from "../../app/store";


interface ProductState {
    products: Product[],
    brand: BrandsList[],
    category: CategoriesList[],
    totalItems: number,
    status: string,
}

const initialState: ProductState = {
    products: [],
    brand: [],
    category: [],
    totalItems: 0,
    status: "",
}

export const fetchAllProductsAsync = createAsyncThunk('product/fetchAllProducts',
    async () => {
        const responce: any = await fetchAllProducts();
        // console.log(responce)
        return responce;
    }
)

export const fetchProductsByFilterAsync = createAsyncThunk('product/fetchProductsByFilter',
    async ({ filter, sort, pagination }: any) => {
        const responce: any = await fetchProductsByFilter(filter, sort, pagination);
        // console.log(responce);

        if (pagination) {
            return responce.data.data;
        }
        return responce.data;
    }
)

export const fetchAllBrandsAsync = createAsyncThunk('brand/fetchAllbrands',
    async () => {
        const responce: any = await fetchAllbrands();
        console.log(responce.data)
        return responce.data;
    }
)
export const fetchAllCategoriesAsync = createAsyncThunk('category/fetchAllCategories',
    async () => {
        const responce: any = await fetchAllCategories();
        console.log(responce.data)
        return responce.data;
    }
)



export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        increment: (state) => {
            console.log(state.products)
            state.products;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllProductsAsync.pending, (state) => {
                state.status = "loading"
            })
            .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
                state.status = "idle",
                    state.totalItems = action.payload;
            })
            .addCase(fetchProductsByFilterAsync.pending, (state) => {
                state.status = "loading"
            })
            .addCase(fetchProductsByFilterAsync.fulfilled, (state, action) => {
                state.status = "idle",
                    state.products = action.payload
            })
            .addCase(fetchAllBrandsAsync.pending, (state) => {
                state.status = "loading"
            })
            .addCase(fetchAllBrandsAsync.fulfilled, (state, action) => {
                state.status = "idle",
                state.brand = action.payload;
            })
            .addCase(fetchAllCategoriesAsync.pending, (state) => {
                state.status = "loading"
            })
            .addCase(fetchAllCategoriesAsync.fulfilled, (state, action) => {
                state.status = "idle",
                state.category = action.payload;
            })
    }
})




export const {
    increment
} = productSlice.actions;

export const selectAllProducts = (state: RootState) => state.product.products as Product[];
export const selectTotalItems = (state: RootState) => state.product.totalItems as number;
export const selectAllCategories = (state: RootState) => state.product.category as CategoriesList[];
export const selectAllBrands = (state: RootState) => state.product.brand as BrandsList[];

export default productSlice.reducer;

