"use client";

import { useState } from "react";
import { Button } from "./ui/button";

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
        <div className="w-full pt-4">
            <table className="bg-slate-100 shadow-md rounded-xl overflow-hidden">
                <thead>
                    <tr className="bg-blue-100 text-gray-700 text-left">
                        {headerRow.map((headerCell, index) => (
                            <th key={index} className="px-2">
                                {headerCell}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {paginatedRows.map((row, rowIndex) => (
                        <tr
                            key={rowIndex + startIndex}
                            className="border-b-2 border-blue-200"
                        >
                            {row.map((cell, cellIndex) => (
                                <td key={cellIndex} className="px-2">
                                    {typeof cell === "object" && cell !== null
                                        ? cell.result || cell.error || "N/A"
                                        : cell || ""}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="py-4">
                <Button
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                    variant="navigator"
                >
                    Trước
                </Button>
                <span className="p-2">
                    Trang {currentPage} Trên {totalPages}
                </span>
                <Button
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                    variant="navigator"
                >
                    Sau
                </Button>
            </div>
        </div>
    );
}
