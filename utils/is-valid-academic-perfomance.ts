export default function isValidAcademicPerformance(
    academicPerformance: string,
    requiredAcademicPerformance: string
): boolean {
    const academicPerformanceOrder = ["Xuất sắc", "Giỏi", "Khá"];
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
