"use client";

import { useState } from "react";
import { useAppSelector } from "@/lib/hooks";
import {
    HeaderRowState,
    selectHeaderRow,
} from "@/lib/features/header-row/header-row-slice";
import { ClusterWorksheetState } from "@/lib/features/cluster-worksheet/cluster-worksheet-slice";
import { FaCaretDown } from "react-icons/fa";
import { FaCaretRight } from "react-icons/fa";

interface RenderClusterDataProps {
    clusterData: ClusterWorksheetState;
}

export default function RenderClusterData({
    clusterData,
}: RenderClusterDataProps) {
    const headerRow: HeaderRowState = useAppSelector(selectHeaderRow);
    const [expandedCluster, setExpandedCluster] = useState<string | null>(null);

    if (!clusterData || Object.keys(clusterData).length === 0) {
        return <div>Chưa có dữ liệu được hiển thị</div>;
    }

    const toggleCluster = (clusterKey: string) => {
        setExpandedCluster((prevCluster) =>
            prevCluster === clusterKey ? null : clusterKey
        );
    };

    return (
        <div className="w-full pt-4">
            {Object.entries(clusterData).map(([clusterKey, worksheetData]) => (
                <div key={clusterKey} className="relative select-none">
                    <div
                        onClick={() => toggleCluster(clusterKey)}
                        className="cursor-pointer h-8 my-2 flex items-center justify-between bg-transparent border-l-2 border-blue-400 hover:translate-x-2 hover:bg-blue-400 hover:text-white transition-all duration-300 ease-in-out"
                    >
                        <div className="flex items-center gap-2">
                            <h2 className="ml-2 text-lg font-medium tracking-wide">
                                {clusterKey}
                            </h2>
                            <div className="font-medium text-lg">
                                {`| ${worksheetData.length}`}
                            </div>
                        </div>
                        <span className="z-10">
                            {expandedCluster === clusterKey ? (
                                <FaCaretDown className="mr-2 size-6" />
                            ) : (
                                <FaCaretRight className="mr-2 size-6" />
                            )}
                        </span>
                    </div>
                    {expandedCluster === clusterKey && (
                        <div className="overflow-auto w-full">
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
                                    {worksheetData.map((row, rowIndex) => (
                                        <tr
                                            key={rowIndex}
                                            className="border-b-2 border-blue-200"
                                        >
                                            {row.map((cell, cellIndex) => (
                                                <td
                                                    key={cellIndex}
                                                    className="px-2"
                                                >
                                                    {typeof cell === "object" &&
                                                    cell !== null
                                                        ? cell.result ||
                                                          cell.error ||
                                                          "N/A"
                                                        : cell || ""}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
