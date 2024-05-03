import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { HeaderRowState } from "@/lib/features/header-row/header-row-slice";
import { ScholarshipConditionState } from "@/lib/features/scholarship-condition/scholarship-condition-slice";
import { TotalStudentsState } from "@/lib/features/total-students/total-students-slice";
import { ClusterWorksheetState } from "@/lib/features/cluster-worksheet/cluster-worksheet-slice";
import { BaseScholarshipPriceState } from "@/lib/features/base-scholarship-price/base-scholarship-price-slice";

import modifyClassificationData from "@/utils/modify-classification-data";
import calculateFilteredTotal from "@/utils/calculate-filtered-total";
import classifyData from "@/utils/classify-data";

export interface FilteredWorksheetsState {
    [key: string]: { [key: string]: any[] };
}

export interface FilteredTotal {
    [key: string]: number[];
}

export interface ClusterResult {
    [key: string]: any[];
}

const initialState: FilteredWorksheetsState = {};

const filteredWorksheetSlice = createSlice({
    name: "filteredWorksheet",
    initialState,
    reducers: {
        setFilteredWorksheet: (
            state,
            action: PayloadAction<{
                headerRow: HeaderRowState;
                clusterWorksheet: ClusterWorksheetState;
                totalStudents: TotalStudentsState;
                baseScholarshipPrice: BaseScholarshipPriceState;
                scholarshipCondition: ScholarshipConditionState;
            }>
        ) => {
            const {
                headerRow,
                clusterWorksheet,
                totalStudents,
                baseScholarshipPrice,
                scholarshipCondition,
            } = action.payload;

            const filteredTotal: FilteredTotal = calculateFilteredTotal(
                clusterWorksheet,
                totalStudents,
                scholarshipCondition
            );

            console.log(filteredTotal);

            const academicPerformanceClassificationIndex =
                headerRow.indexOf("Xếp loại");
            const conductClassificationIndex =
                headerRow.indexOf("Xếp loại hạnh kiểm");
            const scoreIndex = headerRow.indexOf("TB hệ 4");
            const classIndex = headerRow.indexOf("Lớp học");
            const classificationData: FilteredWorksheetsState = classifyData(
                clusterWorksheet,
                scholarshipCondition,
                academicPerformanceClassificationIndex,
                conductClassificationIndex,
                scoreIndex
            );

            console.log(classificationData);

            const filteredWorksheet = modifyClassificationData(
                classificationData,
                filteredTotal,
                scholarshipCondition,
                baseScholarshipPrice,
                classIndex
            );

            console.log(filteredWorksheet);

            return filteredWorksheet;
        },
        deleteFilteredWorksheet: (state, action: PayloadAction<string>) => {
            const key = action.payload;
            delete state[key];
        },
    },
});

export const selectFilteredWorksheet = (state: any) => state.filteredWorksheet;
export const { setFilteredWorksheet, deleteFilteredWorksheet } =
    filteredWorksheetSlice.actions;
export const filteredWorksheetReducer = filteredWorksheetSlice.reducer;
