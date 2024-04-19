import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WorksheetsState {
    [key: string]: any[][];
}

export type HeaderRowState = any[];

const initialState: HeaderRowState = [];

const headerRowSlice = createSlice({
    name: "headerRow",
    initialState,
    reducers: {
        setHeaderRow: (state, action: PayloadAction<WorksheetsState>) => {
            let headerRow;
            const worksheets = action.payload;
            for (const key in worksheets) {
                if (Array.isArray(worksheets[key][0])) {
                    const firstArray = worksheets[key][0];
                    headerRow = firstArray;
                    break;
                }
            }

            if (headerRow) {
                // console.log(headerRow);
                return headerRow;
            }
        },
        clearHeaderRow: (state) => {
            state.splice(0, state.length);
        },
    },
});

export const selectHeaderRow = (state: any) => state.headerRow;
export const { setHeaderRow, clearHeaderRow } = headerRowSlice.actions;
export const headerRowReducer = headerRowSlice.reducer;
