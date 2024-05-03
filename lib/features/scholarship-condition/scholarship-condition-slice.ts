import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ScholarshipConditionState = Array<[number, number, string, string]>;

const initialState: ScholarshipConditionState = [];

const scholarshipConditionSlice = createSlice({
    name: "scholarshipCondition",
    initialState,
    reducers: {
        setScholarshipCondition: (
            state,
            action: PayloadAction<ScholarshipConditionState>
        ) => {
            console.log(action.payload);

            return action.payload;
        },
        deleteScholarshipCondition: (state, action: PayloadAction<number>) => {
            state.splice(action.payload, 1);
        },
    },
});

export const selectScholarshipCondition = (state: any) =>
    state.scholarshipCondition;

export const { setScholarshipCondition, deleteScholarshipCondition } =
    scholarshipConditionSlice.actions;

export const scholarshipConditionReducer = scholarshipConditionSlice.reducer;
