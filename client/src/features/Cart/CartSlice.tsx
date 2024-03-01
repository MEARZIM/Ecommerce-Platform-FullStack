import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface items{
    value: number,
    status: string,
}

const initialState: items = {
    value: 0,
    status: ""
}

export const incrementAsync = createAsyncThunk('Route',
    async () => {
        // const responce = await 
        // return response 
    }
)

export const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(incrementAsync.pending, (state: items) => {
                state.status = "loading"
            })
            .addCase (incrementAsync.fulfilled, (state:items, action) => {
                state.status = "idle",
                state.value;
            })
    }
})

export const {
    increment
} = counterSlice.actions;

// export const selectValue  =  (state ) => state.counter.value;

export default counterSlice.actions;