"use client";

import { useState } from "react";
import { useAppSelector } from "@/lib/hooks";
import {
    HeaderRowState,
    selectHeaderRow,
} from "@/lib/features/header-row/header-row-slice";
import { ClusterWorksheetState } from "@/lib/features/cluster-worksheet/cluster-worksheet-slice";

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
        <div className="w-full">
            {Object.entries(clusterData).map(([clusterKey, worksheetData]) => (
                <div key={clusterKey}>
                    <div onClick={() => toggleCluster(clusterKey)}>
                        <div className="flex gap-2">
                            <h2>{clusterKey}</h2>
                            <span>{worksheetData.length}</span>
                        </div>
                        <span className="cursor-pointer">
                            {expandedCluster === clusterKey ? "▼" : "►"}
                        </span>
                    </div>
                    {expandedCluster === clusterKey && (
                        <table>
                            <thead>
                                <tr>
                                    {headerRow.map((headerCell, index) => (
                                        <th key={index}>{headerCell}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {worksheetData.map((row, rowIndex) => (
                                    <tr key={rowIndex}>
                                        {row.map((cell, cellIndex) => (
                                            <td key={cellIndex}>
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
                    )}
                </div>
            ))}
        </div>
    );
}
