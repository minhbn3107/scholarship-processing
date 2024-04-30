import { ClusterWorksheetState } from "@/lib/features/cluster-worksheet/cluster-worksheet-slice";

export default function sortClusterWorkSheetByKey(obj: ClusterWorksheetState) {
    const keys = Object.keys(obj);

    const sortedKeys = keys.sort((a, b) => a.localeCompare(b));

    const sortedObj: ClusterWorksheetState = {};

    for (const key of sortedKeys) {
        sortedObj[key] = obj[key];
    }

    return sortedObj;
}
