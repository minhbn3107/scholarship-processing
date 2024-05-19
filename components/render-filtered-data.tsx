"use client";

import { useState } from "react";
import { useAppSelector } from "@/lib/hooks";
import {
    FilteredWorksheetsState,
    selectFilteredWorksheet,
} from "@/lib/features/filtered-worksheet/filtered-worksheet-slice";
import {
    HeaderRowState,
    selectHeaderRow,
} from "@/lib/features/header-row/header-row-slice";
import { headerRow } from "@/sample-data";
import formatCurrency from "@/utils/format-currency";

export default function RenderFilteredData() {
    // const headerRow: HeaderRowState = useAppSelector(selectHeaderRow);

    const filteredWorksheet: FilteredWorksheetsState = useAppSelector(
        selectFilteredWorksheet
    );
    const sortedClusterKeys = Object.keys(filteredWorksheet).sort();
    const [expandedCluster, setExpandedCluster] = useState<string | null>(null);
    const [expandedGroups, setExpandedGroups] = useState<
        Record<string, boolean>
    >({});

    if (!filteredWorksheet || Object.keys(filteredWorksheet).length === 0) {
        return <div>Chưa có dữ liệu được hiển thị</div>;
    }

    const toggleCluster = (clusterKey: string) => {
        setExpandedCluster((prevCluster) =>
            prevCluster === clusterKey ? null : clusterKey
        );
    };

    const toggleGroup = (group: string) => {
        setExpandedGroups((prevGroups) => ({
            ...prevGroups,
            [group]: !prevGroups[group],
        }));
    };

    return (
        <div className="w-full">
            {sortedClusterKeys.map((clusterKey) => {
                const worksheetData = filteredWorksheet[clusterKey];
                return (
                    <div key={clusterKey}>
                        <div onClick={() => toggleCluster(clusterKey)}>
                            <div className="flex gap-2">
                                <h2>{clusterKey}</h2>
                                <span>
                                    (
                                    {Object.values(worksheetData).reduce(
                                        (total, arr) => total + arr.length,
                                        0
                                    )}
                                    )
                                </span>
                            </div>
                            <span className="cursor-pointer">
                                {expandedCluster === clusterKey ? "▼" : "►"}
                            </span>
                        </div>
                        {expandedCluster === clusterKey && (
                            <div>
                                {Object.entries(worksheetData).map(
                                    ([
                                        academicPerformanceAndConduct,
                                        students,
                                    ]) => (
                                        <div
                                            key={academicPerformanceAndConduct}
                                        >
                                            <div
                                                onClick={() =>
                                                    toggleGroup(
                                                        academicPerformanceAndConduct
                                                    )
                                                }
                                            >
                                                <h3>
                                                    {
                                                        academicPerformanceAndConduct
                                                    }{" "}
                                                    ({students.length})
                                                </h3>
                                                {students.length > 0 && (
                                                    <span>
                                                        {expandedGroups[
                                                            academicPerformanceAndConduct
                                                        ]
                                                            ? "▼"
                                                            : "►"}
                                                    </span>
                                                )}
                                            </div>
                                            {expandedGroups[
                                                academicPerformanceAndConduct
                                            ] &&
                                                students.length > 0 && (
                                                    <table>
                                                        <thead>
                                                            <tr>
                                                                {headerRow.map(
                                                                    (
                                                                        headerCell,
                                                                        index
                                                                    ) => (
                                                                        <th
                                                                            key={
                                                                                index
                                                                            }
                                                                        >
                                                                            {
                                                                                headerCell
                                                                            }
                                                                        </th>
                                                                    )
                                                                )}
                                                                <th>
                                                                    Mức % học
                                                                    bổng theo TB
                                                                    học phí
                                                                </th>
                                                                <th>Số tiền</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {students.map(
                                                                (
                                                                    row,
                                                                    rowIndex
                                                                ) => (
                                                                    <tr
                                                                        key={
                                                                            rowIndex
                                                                        }
                                                                    >
                                                                        {row.map(
                                                                            (
                                                                                cell: any,
                                                                                cellIndex: any
                                                                            ) => (
                                                                                <td
                                                                                    key={
                                                                                        cellIndex
                                                                                    }
                                                                                >
                                                                                    {typeof cell ===
                                                                                        "object" &&
                                                                                    cell !==
                                                                                        null
                                                                                        ? cell.result ||
                                                                                          cell.error ||
                                                                                          "N/A"
                                                                                        : cellIndex ===
                                                                                          row.length -
                                                                                              2
                                                                                        ? `${formatCurrency(
                                                                                              parseFloat(
                                                                                                  cell
                                                                                              )
                                                                                          )}%`
                                                                                        : cellIndex ===
                                                                                          row.length -
                                                                                              1
                                                                                        ? formatCurrency(
                                                                                              parseFloat(
                                                                                                  cell
                                                                                              )
                                                                                          )
                                                                                        : cell ||
                                                                                          ""}
                                                                                </td>
                                                                            )
                                                                        )}
                                                                    </tr>
                                                                )
                                                            )}
                                                        </tbody>
                                                    </table>
                                                )}
                                        </div>
                                    )
                                )}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
