import { FilteredWorksheetsState } from "@/lib/features/filtered-worksheet/filtered-worksheet-slice";

export interface ExportStructure {
    [academicPerformanceAndConduct: string]: {
        [key: string]: [any[], any?][];
    };
}

export default function reformatData(
    filteredWorksheet: FilteredWorksheetsState
): ExportStructure {
    const result: ExportStructure = {};

    for (const key in filteredWorksheet) {
        const [course, department] = key.split(" - ");
        const departmentKey = department.replace(/^\d+\s*-\s*/, "");

        for (const academicPerformanceAndConduct in filteredWorksheet[key]) {
            if (!result[academicPerformanceAndConduct]) {
                result[academicPerformanceAndConduct] = {};
            }

            if (!result[academicPerformanceAndConduct][departmentKey]) {
                result[academicPerformanceAndConduct][departmentKey] = [];
            }

            result[academicPerformanceAndConduct][departmentKey] = result[
                academicPerformanceAndConduct
            ][departmentKey].concat(
                filteredWorksheet[key][academicPerformanceAndConduct]
            );
        }
    }

    return result;
}
