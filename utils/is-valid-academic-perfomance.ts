import { academicPerformanceOrder } from "@/utils/raking-variable";

export default function isValidAcademicPerformance(
    academicPerformance: string,
    requiredAcademicPerformance: string
): boolean {
    const requiredAcademicPerformanceIndex = academicPerformanceOrder.indexOf(
        requiredAcademicPerformance
    );
    const academicPerformanceIndex =
        academicPerformanceOrder.indexOf(academicPerformance);

    return (
        academicPerformanceIndex >= 0 &&
        academicPerformanceIndex <= requiredAcademicPerformanceIndex
    );
}
