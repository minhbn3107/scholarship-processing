import { ClusterWorksheetState } from "@/lib/features/cluster-worksheet/cluster-worksheet-slice";
import {
    ClusterResult,
    FilteredWorksheetsState,
} from "@/lib/features/filtered-worksheet/filtered-worksheet-slice";
import { ScholarshipConditionState } from "@/lib/features/scholarship-condition/scholarship-condition-slice";
import isValidConduct from "@/utils/is-valid-conduct";
import isValidAcademicPerformance from "@/utils/is-valid-academic-perfomance";

export default function classifyData(
    clusterWorksheet: ClusterWorksheetState,
    scholarshipCondition: ScholarshipConditionState,
    academicPerformanceClassificationIndex: number,
    conductClassificationIndex: number,
    scoreIndex: number
) {
    const classificationData: FilteredWorksheetsState = {};

    for (const key in clusterWorksheet) {
        const clusterData = clusterWorksheet[key];
        const clusterResult: ClusterResult = {};

        for (const [
            percent,
            scholarshipPercent,
            requiredAcademicPerformance,
            requiredConduct,
        ] of scholarshipCondition) {
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
                    clusterResult[academicPerformanceAndConduct].push(row);
                }
            }

            clusterResult[academicPerformanceAndConduct].sort(
                (a, b) => b[scoreIndex] - a[scoreIndex]
            );
        }

        classificationData[key] = clusterResult;
    }

    return classificationData;
}
