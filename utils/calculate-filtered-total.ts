import { ClusterWorksheetState } from "@/lib/features/cluster-worksheet/cluster-worksheet-slice";
import { FilteredTotal } from "@/lib/features/filtered-worksheet/filtered-worksheet-slice";
import { ScholarshipConditionState } from "@/lib/features/scholarship-condition/scholarship-condition-slice";
import { TotalStudentsState } from "@/lib/features/total-students/total-students-slice";

export default function calculateFilteredTotal(
    clusterWorksheet: ClusterWorksheetState,
    totalStudents: TotalStudentsState,
    scholarshipCondition: ScholarshipConditionState
) {
    const filteredTotal: FilteredTotal = {};

    for (const key in clusterWorksheet) {
        const totalStudent = totalStudents[key];
        const recipients = scholarshipCondition.map(([percent]) => {
            const numStudents = Math.round((totalStudent * percent) / 100);
            return numStudents;
        });
        filteredTotal[key] = recipients;
    }

    return filteredTotal;
}
