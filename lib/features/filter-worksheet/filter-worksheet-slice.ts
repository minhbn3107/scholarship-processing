import { HeaderRowState } from "./../header-row/header-row-slice";
import { PercentScholarshipRecipientsState } from "./../percent-scholarship-recipients/percent-scholarship-recipients-slice";
import { BaseScholarshipPriceState } from "./../base-scholarship-price/base-scholarship-price-slice";
import { TotalStudentsState } from "./../total-students/total-students-slice";
import { ClusterWorksheetState } from "./../cluster-worksheet/cluster-worksheet-slice";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import isValidConduct from "@/utils/is-valid-conduct";
import isValidAcademicPerformance from "@/utils/is-valid-academic-perfomance";
import modifyClassificationData from "@/utils/modify-classification-data";

export interface FilteredWorksheetsState {
    // [key: string]: any[][];
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
                percentScholarshipRecipients: PercentScholarshipRecipientsState;
            }>
        ) => {
            const {
                headerRow,
                clusterWorksheet,
                totalStudents,
                baseScholarshipPrice,
                percentScholarshipRecipients,
            } = action.payload;

            const filteredTotal: { [key: string]: number[] } = {};
            for (const key in clusterWorksheet) {
                const totalStudent = totalStudents[key];
                // console.log(percentScholarshipRecipients);

                const recipients = percentScholarshipRecipients.map(
                    ([percent]) => {
                        const numStudents = Math.round(
                            (totalStudent * percent) / 100
                        );
                        return numStudents;
                    }
                );
                const result: number[] = recipients;
                filteredTotal[key] = result;
            }

            console.log(filteredTotal);
            //  ----------------------------------------------------------------

            const classificationData: {
                [key: string]: { [key: string]: any[] };
            } = {};
            const academicPerformanceClassificationIndex =
                headerRow.indexOf("Xếp loại");
            const conductClassificationIndex =
                headerRow.indexOf("Xếp loại hạnh kiểm");
            const scoreIndex = headerRow.indexOf("TB hệ 4");

            for (const key in clusterWorksheet) {
                const clusterData = clusterWorksheet[key];
                const clusterResult: { [key: string]: any[] } = {};

                for (const [
                    percent,
                    scholarshipPercent,
                    requiredAcademicPerformance,
                    requiredConduct,
                ] of percentScholarshipRecipients) {
                    const academicPerformanceAndConduct = `${requiredAcademicPerformance} - ${requiredConduct}`;
                    clusterResult[academicPerformanceAndConduct] = [];

                    for (const row of clusterData) {
                        const academicPerformance =
                            row[academicPerformanceClassificationIndex];
                        const conduct = row[conductClassificationIndex];

                        if (
                            isValidAcademicPerformance(
                                academicPerformance,
                                requiredAcademicPerformance
                            ) &&
                            isValidConduct(conduct, requiredConduct)
                        ) {
                            clusterResult[academicPerformanceAndConduct].push(
                                row
                            );
                        }
                    }

                    clusterResult[academicPerformanceAndConduct].sort(
                        (a, b) => b[scoreIndex] - a[scoreIndex]
                    );
                }

                classificationData[key] = clusterResult;
            }

            const modifiedClassificationData = modifyClassificationData(
                classificationData,
                filteredTotal,
                percentScholarshipRecipients
            );

            console.log(modifiedClassificationData);

            return modifiedClassificationData;
        },
        deleteFilteredWorksheet: (state, action: PayloadAction<string>) => {
            const key = action.payload;
            // delete state[key];
        },
    },
});

export const selectFilteredWorksheet = (state: any) => state.filteredWorksheet;
export const { setFilteredWorksheet, deleteFilteredWorksheet } =
    filteredWorksheetSlice.actions;
export const filteredWorksheetReducer = filteredWorksheetSlice.reducer;
