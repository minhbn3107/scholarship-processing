export default function preprocessWorksheet(worksheet: any[][]) {
    return worksheet.map((row) =>
        row.map((cell) => {
            if (typeof cell === "object" && cell !== null) {
                return cell.result || `Error: ${cell.error || "N/A"}`;
            }
            return cell || "";
        })
    );
}
