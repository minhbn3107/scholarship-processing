import { FilteredWorksheetsState } from "@/lib/features/filtered-worksheet/filtered-worksheet-slice";
import { HeaderRowState } from "@/lib/features/header-row/header-row-slice";
import reformatData from "@/utils/reformat-data";
const ExcelJS = require("exceljs");

export default async function exportToExcel(
    filteredWorksheet: FilteredWorksheetsState,
    headerRow: HeaderRowState
) {
    const exportedData = reformatData(filteredWorksheet);
    const workbook = new ExcelJS.Workbook();
    workbook.properties.defaultFont = { name: "Times New Roman", size: 11 };

    const newHeaderRow = [
        ...headerRow.slice(0, 2),
        "STT Gốc",
        ...headerRow.slice(2),
    ];

    const headerRowValues = [
        ...newHeaderRow.slice(1),
        "Mức % học bổng theo TB học phí",
        "Số tiền",
    ];

    let clusterIndex = 0;
    for (const academicPerformanceAndConduct in exportedData) {
        const sheetName = `Loại ${String.fromCharCode(65 + clusterIndex)}`;
        const sheet = workbook.addWorksheet(sheetName);

        const titleRow = sheet.addRow([
            `DANH SÁCH SINH VIÊN ĐƯỢC CẤP HỌC BỔNG Bậc đại học - Mức học bổng loại ${sheetName}`,
        ]);
        titleRow.getCell(1).font = { bold: true, size: 14 };
        titleRow.getCell(1).alignment = { horizontal: "center" };
        titleRow.getCell(1).alignment = { wrapText: true };
        sheet.mergeCells(
            `A1:${String.fromCharCode(64 + headerRowValues.length)}1`
        );
        sheet.addRow([""]);
        sheet.addRow([""]);
        sheet.addRow([""]);

        const headerRow = sheet.addRow(headerRowValues);
        headerRow.eachCell((cell: any, colNumber: any) => {
            cell.font = { bold: true };
            cell.alignment = {
                horizontal: "center",
                vertical: "middle",
                wrapText: true,
            };
            cell.border = {
                top: { style: "medium" },
                left: { style: "medium" },
                bottom: { style: "medium" },
                right: { style: "medium" },
            };
        });

        const faculties = exportedData[academicPerformanceAndConduct];
        let totalAmount = 0;
        for (const faculty in faculties) {
            const facultyData = faculties[faculty];
            if (facultyData.length > 0) {
                const facultyRowNumber = sheet.rowCount + 1;
                const facultyRow = sheet.addRow([faculty]);
                facultyRow.getCell(1).font = { bold: true };

                let studentIndex = 1;
                for (const studentData of facultyData) {
                    const rowValues = [studentIndex, ...studentData.slice(1)];
                    rowValues[headerRowValues.length - 2] += "%";
                    const row = sheet.addRow(rowValues);
                    row.getCell(headerRowValues.length).numFmt = "#,##0";
                    row.eachCell((cell: any, colNumber: any) => {
                        cell.border = {
                            top: { style: "medium" },
                            left: { style: "medium" },
                            bottom: { style: "medium" },
                            right: { style: "medium" },
                        };
                    });
                    studentIndex++;
                    totalAmount += rowValues[headerRowValues.length - 1];
                }

                const lastStudentRowNumber = sheet.rowCount;
                sheet.mergeCells(
                    `A${facultyRowNumber}:${String.fromCharCode(
                        65 + headerRowValues.length - 3
                    )}${facultyRowNumber}`
                );
                const numberOfStudents = facultyRow.getCell(
                    headerRowValues.length - 1
                );
                numberOfStudents.value = facultyData.length;
                const totalAmountCell = facultyRow.getCell(
                    headerRowValues.length
                );
                totalAmountCell.value = {
                    formula: `SUM(${String.fromCharCode(
                        65 + headerRowValues.length - 1
                    )}${facultyRowNumber + 1}:${String.fromCharCode(
                        65 + headerRowValues.length - 1
                    )}${lastStudentRowNumber})`,
                };
                totalAmountCell.border = {
                    top: { style: "medium" },
                    left: { style: "medium" },
                    bottom: { style: "medium" },
                    right: { style: "medium" },
                };
                totalAmountCell.numFmt = "#,##0";
            }
        }

        const totalRowNumber = sheet.rowCount + 1;
        const totalRow = sheet.addRow(["TỔNG CỘNG"]);
        totalRow.getCell(1).font = { bold: true };
        totalRow.getCell(headerRowValues.length).value = totalAmount;
        totalRow.getCell(headerRowValues.length).numFmt = "#,##0";
        sheet.mergeCells(
            `A${totalRowNumber}:${String.fromCharCode(
                65 + headerRowValues.length - 2
            )}${totalRowNumber}`
        );
        sheet.getColumn(headerRowValues.length).width = 15;

        clusterIndex++;
    }

    return workbook;
}
