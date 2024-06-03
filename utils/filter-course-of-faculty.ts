import { ClusterWorksheetState } from "@/lib/features/cluster-worksheet/cluster-worksheet-slice";

export function filterCourseOfFaculty(clusterData: ClusterWorksheetState) {
    const courseList: string[] = [];

    for (const key in clusterData) {
        const facultyParts = key.split(" - ");
        const course = facultyParts[0];

        if (!courseList.includes(course)) {
            courseList.push(course);
        }
    }

    return courseList;
}
