import { configureStore } from "@reduxjs/toolkit";
import { worksheetsReducer } from "./features/worksheet/worksheet-slice";
import { clusterWorksheetReducer } from "./features/cluster-worksheet/cluster-worksheet-slice";
import { headerRowReducer } from "./features/header-row/header-row-slice";
import { totalStudentReducer } from "./features/total-students/total-students-slice";
import { baseScholarshipPriceReducer } from "./features/base-scholarship-price/base-scholarship-price-slice";
import { percentScholarshipRecipientsReducer } from "./features/percent-scholarship-recipients/percent-scholarship-recipients-slice";
import { filteredWorksheetReducer } from "./features/filter-worksheet/filter-worksheet-slice";

export const makeStore = () => {
    return configureStore({
        reducer: {
            worksheets: worksheetsReducer,
            clusterWorksheet: clusterWorksheetReducer,
            headerRow: headerRowReducer,
            totalStudent: totalStudentReducer,
            baseScholarshipPrice: baseScholarshipPriceReducer,
            percentScholarshipRecipients: percentScholarshipRecipientsReducer,
            filteredWorksheet: filteredWorksheetReducer,
        },
    });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
