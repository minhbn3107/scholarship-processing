"use client";

import { ClusterWorksheetsState } from "@/lib/features/cluster-worksheets/cluster-worksheet-slice";
import { Button } from "./ui/button";

interface WorksheetsState {
    [key: string]: any[][];
}

interface WorkSheetPageProps {
    worksheets: WorksheetsState;
    handleWorksheetClick: (sheetName: string) => void;
    selectedWorksheet: any[][];
    clustered: boolean;
    handleClusterWorksheetClick: () => void;
    isSelectedClusterWorksheet: boolean;
}

export default function WorkSheetPage({
    worksheets,
    handleWorksheetClick,
    selectedWorksheet,
    clustered,
    handleClusterWorksheetClick,
    isSelectedClusterWorksheet,
}: WorkSheetPageProps) {
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
                        Cluster Worksheet
                    </Button>
                )}
            </div>
        </>
    );
}
