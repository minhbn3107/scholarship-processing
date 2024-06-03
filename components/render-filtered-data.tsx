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
import formatCurrency from "@/utils/format-currency";
import { FaCaretDown } from "react-icons/fa";
import { FaCaretRight } from "react-icons/fa";

export default function RenderFilteredData() {
    const headerRow: HeaderRowState = useAppSelector(selectHeaderRow);
    const newHeaderRow: HeaderRowState =
        headerRow.length !== 0
            ? [...headerRow, "Mức % học bổng theo TB học phí", "Số tiền"]
            : [];

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
        <div className="w-full pt-4">
            {sortedClusterKeys.map((clusterKey) => {
                const worksheetData = filteredWorksheet[clusterKey];
                return (
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
                                    |{" "}
                                    {Object.values(worksheetData).reduce(
                                        (total, arr) => total + arr.length,
                                        0
                                    )}
                                </div>
                            </div>
                            <span className="cursor-pointer">
                                {expandedCluster === clusterKey ? (
                                    <FaCaretDown className="mr-2 size-6" />
                                ) : (
                                    <FaCaretRight className="mr-2 size-6" />
                                )}
                            </span>
                        </div>
                        {expandedCluster === clusterKey && (
                            <div className="ml-4">
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
                                                className="cursor-pointer h-8 my-2 flex items-center justify-between bg-transparent border-l-2 border-blue-300 hover:translate-x-2 hover:bg-blue-300 hover:text-white transition-all duration-300 ease-in-out"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <h3 className="ml-2 text-lg tracking-wide">
                                                        {
                                                            academicPerformanceAndConduct
                                                        }
                                                    </h3>
                                                    <div className="text-lg">
                                                        {`| ${students.length}`}
                                                    </div>
                                                </div>
                                                {students.length > 0 && (
                                                    <span>
                                                        {expandedGroups[
                                                            academicPerformanceAndConduct
                                                        ] ? (
                                                            <FaCaretDown className="mr-2 size-6" />
                                                        ) : (
                                                            <FaCaretRight className="mr-2 size-6" />
                                                        )}
                                                    </span>
                                                )}
                                            </div>
                                            {expandedGroups[
                                                academicPerformanceAndConduct
                                            ] &&
                                                students.length > 0 && (
                                                    <div className="overflow-auto w-full">
                                                        <table className="bg-slate-100 shadow-md rounded-xl overflow-hidden">
                                                            <thead>
                                                                <tr className="bg-blue-100 text-gray-700 text-left">
                                                                    {newHeaderRow.map(
                                                                        (
                                                                            headerCell,
                                                                            index
                                                                        ) => (
                                                                            <th
                                                                                key={
                                                                                    index
                                                                                }
                                                                                className="px-2"
                                                                            >
                                                                                {
                                                                                    headerCell
                                                                                }
                                                                            </th>
                                                                        )
                                                                    )}
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
                                                                            className="border-b-2 border-blue-200"
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
                                                                                        className="px-2"
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
                                                    </div>
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
