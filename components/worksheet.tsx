"use client";

import { WorksheetsState } from "@/lib/features/worksheet/worksheet-slice";
import { Button } from "./ui/button";
import {
    FilteredWorksheetsState,
    selectFilteredWorksheet,
} from "@/lib/features/filtered-worksheet/filtered-worksheet-slice";
import { useAppSelector } from "@/lib/hooks";

interface WorkSheetPageProps {
    worksheets: WorksheetsState;
    handleWorksheetClick: (sheetName: string) => void;
    selectedWorksheet: any[][];
    clustered: boolean;
    handleClusterWorksheetClick: () => void;
    isSelectedClusterWorksheet: boolean;
    filtered: boolean;
    handleFilterWorksheetClick: () => void;
    isSelectedFilteredWorksheet: boolean;
}

export default function WorkSheetPage({
    worksheets,
    handleWorksheetClick,
    selectedWorksheet,
    clustered,
    handleClusterWorksheetClick,
    isSelectedClusterWorksheet,
    filtered,
    handleFilterWorksheetClick,
    isSelectedFilteredWorksheet,
}: WorkSheetPageProps) {
    const filteredWorksheet: FilteredWorksheetsState = useAppSelector(
        selectFilteredWorksheet
    );

    return (
        <>
            <div className="flex flex-1 gap-2 flex-wrap">
                {Object.keys(worksheets).map((sheetName) => (
                    <Button
                        key={sheetName}
                        onClick={() => handleWorksheetClick(sheetName)}
                        variant={
                            selectedWorksheet === worksheets[sheetName]
                                ? "blue"
                                : "outline"
                        }
                        className="w-auto min-w-[260px]"
                    >
                        {sheetName}
                    </Button>
                ))}
                {clustered && (
                    <Button
                        onClick={() => handleClusterWorksheetClick()}
                        variant={
                            isSelectedClusterWorksheet ? "blue" : "outline"
                        }
                        className="w-auto min-w-[260px]"
                    >
                        Bảng chia theo khoa và khóa
                    </Button>
                )}
                {filtered &&
                    filteredWorksheet &&
                    Object.keys(filteredWorksheet).length !== 0 && (
                        <Button
                            onClick={() => handleFilterWorksheetClick()}
                            variant={
                                isSelectedFilteredWorksheet ? "blue" : "outline"
                            }
                            className="w-auto min-w-[260px]"
                        >
                            Bảng lọc sinh viên nhận học bổng
                        </Button>
                    )}
            </div>
        </>
    );
}
