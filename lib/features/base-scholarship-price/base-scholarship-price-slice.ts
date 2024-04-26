import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface BaseScholarshipPriceState {
    [key: string]: number[];
}

const initialState: BaseScholarshipPriceState = {};

const baseScholarshipPriceSlice = createSlice({
    name: "baseScholarshipPrice",
    initialState,
    reducers: {
        setBaseScholarshipPrice: (
            state,
            action: PayloadAction<BaseScholarshipPriceState>
        ) => {
            console.log(action.payload);

            return {
                ...state,
                ...action.payload,
            };
        },
        deleteBaseScholarshipPrice: (state, action: PayloadAction<string>) => {
            const key = action.payload;
            delete state[key];
        },
    },
});

export const selectBaseScholarshipPrice = (state: any) =>
    state.baseScholarshipPrice;
export const { setBaseScholarshipPrice, deleteBaseScholarshipPrice } =
    baseScholarshipPriceSlice.actions;
export const baseScholarshipPriceReducer = baseScholarshipPriceSlice.reducer;
