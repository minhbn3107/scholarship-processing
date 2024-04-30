export default function modifyClassificationData(
    classificationData: {
        [key: string]: { [key: string]: any[] };
    },
    filteredTotal: { [key: string]: number[] },
    percentScholarshipRecipients: Array<[number, number, string, string]>
) {
    const modifiedData: { [key: string]: { [key: string]: any[] } } = {};

    for (const key in classificationData) {
        modifiedData[key] = {};
        const totalStudents = filteredTotal[key];
        const academicPerformanceAndConductKeys = Object.keys(
            classificationData[key]
        );

        let alreadyIncludedRows: any[] = [];

        for (let i = 0; i < totalStudents.length; i++) {
            const requiredCount = totalStudents[i];
            const academicPerformanceAndConduct =
                academicPerformanceAndConductKeys[i];
            const students =
                classificationData[key][academicPerformanceAndConduct];

            const [_, scholarshipPercent] = percentScholarshipRecipients[i];

            if (students.length <= requiredCount) {
                modifiedData[key][academicPerformanceAndConduct] = students.map(
                    (row) => [...row, scholarshipPercent]
                );
                alreadyIncludedRows = [...alreadyIncludedRows, ...students];
            } else {
                modifiedData[key][academicPerformanceAndConduct] = students
                    .slice(0, requiredCount)
                    .map((row) => [...row, scholarshipPercent]);
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
                        ...remainingStudents.map((row) => [
                            ...row,
                            scholarshipPercent,
                        ]),
                    ];
                }
            }
        }
    }

    return modifiedData;
}
