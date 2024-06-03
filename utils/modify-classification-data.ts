import { BaseScholarshipPriceState } from "@/lib/features/base-scholarship-price/base-scholarship-price-slice";
import { ExceptionBaseScholarshipPriceState } from "@/lib/features/exception-base-scholarship-price/exception-base-scholarship-price-slice";
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
    exceptionBaseScholarshipPrice: ExceptionBaseScholarshipPriceState,
    classIndex: number
) {
    const modifiedData: FilteredWorksheetsState = {};
    const newFilteredData: FilteredTotal = structuredClone(filteredTotal);

    for (const key in classificationData) {
        modifiedData[key] = {};
        const totalStudents = newFilteredData[key];
        const academicPerformanceAndConductKeys = Object.keys(
            classificationData[key]
        );
        const [lowScholarshipPrice, highScholarshipPrice] =
            baseScholarshipPrice[key];
        const [
            exceptionLowScholarshipPrice,
            exceptionHighScholarshipPrice,
            specializedCode,
        ] = exceptionBaseScholarshipPrice[key] || [];
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
                        const scholarshipPrice =
                            exceptionBaseScholarshipPrice[key] &&
                            classValue.startsWith(specializedCode)
                                ? classValue.endsWith("TT")
                                    ? exceptionHighScholarshipPrice
                                    : exceptionLowScholarshipPrice
                                : classValue.endsWith("TT")
                                ? highScholarshipPrice
                                : lowScholarshipPrice;
                        const scholarshipAmount =
                            (scholarshipPrice * scholarshipPercent) / 100;
                        return [...row, scholarshipPercent, scholarshipAmount];
                    }
                );
                alreadyIncludedRows = [...alreadyIncludedRows, ...students];

                const nextIndex = i + 1;
                const nextAcademicPerformanceAndConduct =
                    academicPerformanceAndConductKeys[nextIndex];
                if (nextAcademicPerformanceAndConduct) {
                    const remainingCount = requiredCount - students.length;
                    newFilteredData[key][i] -= remainingCount;
                    newFilteredData[key][nextIndex] += remainingCount;
                    // console.log(
                    //     key,
                    //     newFilteredData[key][i],
                    //     newFilteredData[key][nextIndex]
                    // );
                }
            } else {
                modifiedData[key][academicPerformanceAndConduct] = students
                    .slice(0, requiredCount)
                    .map((row) => {
                        const classValue = row[classIndex];
                        const scholarshipPrice =
                            exceptionBaseScholarshipPrice[key] &&
                            classValue.startsWith(specializedCode)
                                ? classValue.endsWith("TT")
                                    ? exceptionHighScholarshipPrice
                                    : exceptionLowScholarshipPrice
                                : classValue.endsWith("TT")
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
                            const scholarshipPrice =
                                exceptionBaseScholarshipPrice[key] &&
                                classValue.startsWith(specializedCode)
                                    ? classValue.endsWith("TT")
                                        ? exceptionHighScholarshipPrice
                                        : exceptionLowScholarshipPrice
                                    : classValue.endsWith("TT")
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
    console.log(newFilteredData);

    return modifiedData;
}
