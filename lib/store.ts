import { configureStore } from "@reduxjs/toolkit";
import { worksheetsReducer } from "./features/worksheet/worksheet-slice";
import { clusterWorksheetReducer } from "./features/cluster-worksheets/cluster-worksheet-slice";
import { headerRowReducer } from "./features/header-row/header-row-slice";

export const makeStore = () => {
    return configureStore({
        reducer: {
            worksheets: worksheetsReducer,
            clusterWorksheet: clusterWorksheetReducer,
            headerRow: headerRowReducer,
        },
    });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
