import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ClusterWorksheetsState {
    [key: string]: any[][];
}

const initialState: ClusterWorksheetsState = {};

const clusterWorksheetSlice = createSlice({
    name: "clusterWorksheet",
    initialState,
    reducers: {
        setClusterWorksheet: (
            state,
            action: PayloadAction<ClusterWorksheetsState>
        ) => {
            const allWorksheets: any[][] = [];
            const newState: ClusterWorksheetsState = {};

            for (const [key, worksheet] of Object.entries(action.payload)) {
                allWorksheets.push(...worksheet);
            }

            const headerRow = allWorksheets[0];
            const classIndex = headerRow.findIndex(
                (cell) => typeof cell === "string" && cell.includes("Lớp học")
            );
            const facultyIndex = headerRow.findIndex(
                (cell) => typeof cell === "string" && cell.trim() === "Khoa"
            );
            const sttIndex = headerRow.findIndex(
                (cell) => typeof cell === "string" && cell.trim() === "STT"
            );

            if (classIndex !== -1 && facultyIndex !== -1 && sttIndex !== -1) {
                allWorksheets.forEach((row) => {
                    const lopHocName = row[classIndex] || "";
                    const facultyName = row[facultyIndex];
                    const sttValue = row[sttIndex];
                    let clusterKey: string;

                    if (lopHocName && sttValue !== "STT") {
                        const classNumber = lopHocName.match(/\d+/)?.[0] || "";
                        clusterKey = classNumber
                            ? `${classNumber} - ${facultyName}`
                            : `Other - ${facultyName}`;

                        if (!newState[clusterKey]) {
                            newState[clusterKey] = [];
                        }
                        newState[clusterKey].push(row);
                    }
                });

                console.log(newState);

                return newState;
            }

            return state;
        },
        deleteClusterWorksheet: (state, action: PayloadAction<string>) => {
            const key = action.payload;
            delete state[key];
        },
    },
});

export const selectClusterWorksheet = (state: any) => state.clusterWorksheet;
export const { setClusterWorksheet, deleteClusterWorksheet } =
    clusterWorksheetSlice.actions;
export const clusterWorksheetReducer = clusterWorksheetSlice.reducer;
