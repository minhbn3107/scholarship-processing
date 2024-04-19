import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface WorksheetsState {
    [key: string]: any[][];
}

const initialState: WorksheetsState = {};

const worksheetsSlice = createSlice({
    name: "worksheets",
    initialState,
    reducers: {
        setWorksheets: (state, action: PayloadAction<WorksheetsState>) => {
            const filteredPayload: WorksheetsState = {};

            for (const [key, worksheet] of Object.entries(action.payload)) {
                const startIndex = worksheet.findIndex((row) =>
                    row.includes("STT")
                );
                if (startIndex !== -1) {
                    filteredPayload[key] = worksheet.slice(startIndex);
                }
            }

            // console.log(filteredPayload);

            return { ...state, ...filteredPayload };
        },
        updateWorksheet: (
            state,
            action: PayloadAction<{ key: number; worksheet: any[][] }>
        ) => {
            const { key, worksheet } = action.payload;
            state[key] = worksheet;
        },
        deleteWorksheet: (state, action: PayloadAction<number>) => {
            const key = action.payload;
            delete state[key];
        },
    },
});

export const selectWorksheets = (state: any) => state.worksheets;

export const { setWorksheets, updateWorksheet, deleteWorksheet } =
    worksheetsSlice.actions;

export const worksheetsReducer = worksheetsSlice.reducer;
