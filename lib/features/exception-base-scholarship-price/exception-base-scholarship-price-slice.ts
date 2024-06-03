import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ExceptionBaseScholarshipPriceState {
    [key: string]: [number, number, string];
}

const initialState: ExceptionBaseScholarshipPriceState = {};

const exceptionBaseScholarshipPriceSlice = createSlice({
    name: "baseScholarshipPrice",
    initialState,
    reducers: {
        setExceptionBaseScholarshipPrice: (
            state,
            action: PayloadAction<ExceptionBaseScholarshipPriceState>
        ) => {
            console.log(action.payload);

            return {
                ...state,
                ...action.payload,
            };
        },
        deleteExceptionBaseScholarshipPrice: (
            state,
            action: PayloadAction<string>
        ) => {
            const key = action.payload;
            delete state[key];
        },
    },
});

export const selectExceptionBaseScholarshipPrice = (state: any) =>
    state.exceptionBaseScholarshipPrice;
export const {
    setExceptionBaseScholarshipPrice,
    deleteExceptionBaseScholarshipPrice,
} = exceptionBaseScholarshipPriceSlice.actions;
export const exceptionBaseScholarshipPriceReducer =
    exceptionBaseScholarshipPriceSlice.reducer;
