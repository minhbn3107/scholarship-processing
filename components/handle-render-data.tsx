"use client";

import { ClusterWorksheetState } from "@/lib/features/cluster-worksheet/cluster-worksheet-slice";
import preprocessWorksheet from "@/utils/preprocess-worksheet";
import sortClusterWorkSheetByKey from "@/utils/sort-cluster-by-key";

import RenderRawData from "./render-raw-data";
import RenderClusterData from "./render-cluster-data";
import RenderFilteredWorksheet from "./render-filtered-data";

interface HandleRenderData {
    selectedWorksheet: any[][];
    isSelectedClusterWorksheet: boolean;
    clusterWorksheet: ClusterWorksheetState;
    isSelectedFilteredWorksheet: boolean;
}

export default function HandleRenderData({
    selectedWorksheet,
    isSelectedClusterWorksheet,
    clusterWorksheet,
    isSelectedFilteredWorksheet,
}: HandleRenderData) {
    const preprocessedWorksheet = preprocessWorksheet(selectedWorksheet);
    const sortedClusterWorksheet = sortClusterWorkSheetByKey(clusterWorksheet);
    return (
        <>
            {selectedWorksheet &&
                !isSelectedClusterWorksheet &&
                !isSelectedFilteredWorksheet && (
                    <RenderRawData worksheet={preprocessedWorksheet} />
                )}
            {isSelectedClusterWorksheet && (
                <RenderClusterData clusterData={sortedClusterWorksheet} />
            )}
            {isSelectedFilteredWorksheet && <RenderFilteredWorksheet />}
        </>
    );
}
