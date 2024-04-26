"use client";

import { ClusterWorksheetsState } from "@/lib/features/cluster-worksheet/cluster-worksheet-slice";
import preprocessWorksheet from "@/utils/preprocess-worksheet";
import sortClusterWorkSheetByKey from "@/utils/sort-cluster-by-key";

import RenderRawData from "./render-raw-data";
import RenderClusterData from "./render-cluster-data";

interface HandleRenderData {
    selectedWorksheet: any[][];
    isSelectedClusterWorksheet: boolean;
    clusterWorksheet: ClusterWorksheetsState;
}

export default function HandleRenderData({
    selectedWorksheet,
    isSelectedClusterWorksheet,
    clusterWorksheet,
}: HandleRenderData) {
    const preprocessedWorksheet = preprocessWorksheet(selectedWorksheet);
    const sortedClusterWorksheet = sortClusterWorkSheetByKey(clusterWorksheet);
    return (
        <>
            {selectedWorksheet && !isSelectedClusterWorksheet && (
                <RenderRawData worksheet={preprocessedWorksheet} />
            )}
            {isSelectedClusterWorksheet && (
                <RenderClusterData clusterData={sortedClusterWorksheet} />
            )}
        </>
    );
}
