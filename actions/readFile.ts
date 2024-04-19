"use server";

const ExcelJS = require("exceljs");

export const readExcel = async (buffer: Buffer, fileName: string) => {
    try {
        const workbook = new ExcelJS.Workbook();
        console.log("Loading Excel file...");
        await workbook.xlsx.load(buffer);
        console.log("Excel file loaded successfully.");

        const worksheets = workbook.worksheets;
        const lastWorksheet = worksheets[worksheets.length - 1];
        const lastSheetName = `${fileName} - ${lastWorksheet.name}`;

        const rows: any[][] = [];
        lastWorksheet.eachRow((row: any, rowNumber: number) => {
            const rowValues = row.values;
            rows.push(rowValues);
        });

        console.log(`Worksheet '${lastSheetName}' processed successfully.`);
        return { [lastSheetName]: rows };
    } catch (error) {
        console.error("Error reading Excel file:", error);
        throw error;
    }
};
