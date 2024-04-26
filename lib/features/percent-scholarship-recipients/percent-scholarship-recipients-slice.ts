import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type PercentScholarshipRecipientsState = number[][];

const initialState: PercentScholarshipRecipientsState = [[]];

const percentScholarshipRecipientsSlice = createSlice({
    name: "percentScholarshipRecipients",
    initialState,
    reducers: {
        setPercentScholarshipRecipients: (
            state,
            action: PayloadAction<PercentScholarshipRecipientsState>
        ) => {
            // console.log(action.payload);

            return action.payload;
        },
        deletePercentScholarshipRecipients: (
            state,
            action: PayloadAction<number>
        ) => {
            state[0].splice(action.payload, 1);
        },
    },
});

export const selectPercentScholarshipRecipients = (state: any) =>
    state.percentScholarshipRecipients;

export const {
    setPercentScholarshipRecipients,
    deletePercentScholarshipRecipients,
} = percentScholarshipRecipientsSlice.actions;

export const percentScholarshipRecipientsReducer =
    percentScholarshipRecipientsSlice.reducer;