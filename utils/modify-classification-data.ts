import { BaseScholarshipPriceState } from "@/lib/features/base-scholarship-price/base-scholarship-price-slice";
import {
    FilteredTotal,
    FilteredWorksheetsState,
} from "@/lib/features/filtered-worksheet/filtered-worksheet-slice";
import { ScholarshipConditionState } from "@/lib/features/scholarship-condition/scholarship-condition-slice";

export default function modifyClassificationData(
    classificationData: FilteredWorksheetsState,
    filteredTotal: FilteredTotal,
    scholarshipCondition: ScholarshipConditionState,
    baseScholarshipPrice: BaseScholarshipPriceState,
    classIndex: number
) {
    const modifiedData: FilteredWorksheetsState = {};

    for (const key in classificationData) {
        modifiedData[key] = {};
        const totalStudents = filteredTotal[key];
        const academicPerformanceAndConductKeys = Object.keys(
            classificationData[key]
        );
        const [lowScholarshipPrice, highScholarshipPrice] =
            baseScholarshipPrice[key];

        let alreadyIncludedRows: any[] = [];

        for (let i = 0; i < totalStudents.length; i++) {
            const requiredCount = totalStudents[i];
            const academicPerformanceAndConduct =
                academicPerformanceAndConductKeys[i];
            const students =
                classificationData[key][academicPerformanceAndConduct];
            const [_, scholarshipPercent] = scholarshipCondition[i];

            if (students.length <= requiredCount) {
                modifiedData[key][academicPerformanceAndConduct] = students.map(
                    (row) => {
                        const classValue = row[classIndex];
                        const scholarshipPrice = classValue.endsWith("TT")
                            ? highScholarshipPrice
                            : lowScholarshipPrice;
                        const scholarshipAmount =
                            (scholarshipPrice * scholarshipPercent) / 100;
                        return [...row, scholarshipPercent, scholarshipAmount];
                    }
                );
                alreadyIncludedRows = [...alreadyIncludedRows, ...students];
            } else {
                modifiedData[key][academicPerformanceAndConduct] = students
                    .slice(0, requiredCount)
                    .map((row) => {
                        const classValue = row[classIndex];
                        const scholarshipPrice = classValue.endsWith("TT")
                            ? highScholarshipPrice
                            : lowScholarshipPrice;
                        const scholarshipAmount =
                            (scholarshipPrice * scholarshipPercent) / 100;
                        return [...row, scholarshipPercent, scholarshipAmount];
                    });
                alreadyIncludedRows = [
                    ...alreadyIncludedRows,
                    ...students.slice(0, requiredCount),
                ];

                const remainingStudents = students
                    .slice(requiredCount)
                    .filter((row) => !alreadyIncludedRows.includes(row));
                const nextIndex = i + 1;
                const nextAcademicPerformanceAndConduct =
                    academicPerformanceAndConductKeys[nextIndex];

                if (nextAcademicPerformanceAndConduct) {
                    modifiedData[key][nextAcademicPerformanceAndConduct] =
                        modifiedData[key][nextAcademicPerformanceAndConduct] ||
                        [];
                    modifiedData[key][nextAcademicPerformanceAndConduct] = [
                        ...modifiedData[key][nextAcademicPerformanceAndConduct],
                        ...remainingStudents.map((row) => {
                            const classValue = row[classIndex];
                            const scholarshipPrice = classValue.endsWith("TT")
                                ? highScholarshipPrice
                                : lowScholarshipPrice;
                            const scholarshipAmount =
                                (scholarshipPrice * scholarshipPercent) / 100;
                            return [
                                ...row,
                                scholarshipPercent,
                                scholarshipAmount,
                            ];
                        }),
                    ];
                }
            }
        }
    }

    return modifiedData;
}
