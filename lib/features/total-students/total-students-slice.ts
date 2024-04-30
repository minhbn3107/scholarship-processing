import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TotalStudentsState {
    [key: string]: number;
}

const initialState: TotalStudentsState = {};

const totalStudentSlice = createSlice({
    name: "totalStudent",
    initialState,
    reducers: {
        setTotalStudent: (state, action: PayloadAction<TotalStudentsState>) => {
            console.log(action.payload);

            return {
                ...state,
                ...action.payload,
            };
        },
        deleteTotalStudent: (state, action: PayloadAction<string>) => {
            const key = action.payload;
            delete state[key];
        },
    },
});

export const selectTotalStudent = (state: any) => state.totalStudent;
export const { setTotalStudent, deleteTotalStudent } =
    totalStudentSlice.actions;
export const totalStudentReducer = totalStudentSlice.reducer;
