"use client";

import { useState } from "react";

interface RenderRawDataProps {
    worksheet: any[][];
}

const PAGE_SIZE = 100;

export default function RenderRawData({ worksheet }: RenderRawDataProps) {
    const [currentPage, setCurrentPage] = useState(1);

    if (!worksheet || worksheet.length === 0) {
        return <div>Chưa có dữ liệu được hiển thị</div>;
    }

    const headerRow = worksheet[0];
    const totalPages = Math.ceil((worksheet.length - 1) / PAGE_SIZE);

    const startIndex = (currentPage - 1) * PAGE_SIZE + 1;
    const endIndex = startIndex + PAGE_SIZE - 1;
    const paginatedRows = worksheet.slice(startIndex, endIndex + 1);

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        {headerRow.map((headerCell, index) => (
                            <th key={index}>{headerCell}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {paginatedRows.map((row, rowIndex) => (
                        <tr key={rowIndex + startIndex}>
                            {row.map((cell, cellIndex) => (
                                <td key={cellIndex}>
                                    {typeof cell === "object" && cell !== null
                                        ? cell.result || cell.error || "N/A"
                                        : cell || ""}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <button
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                >
                    Trước
                </button>
                <span>
                    Trang {currentPage} Trên {totalPages}
                </span>
                <button
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                >
                    Sau
                </button>
            </div>
        </div>
    );
}
