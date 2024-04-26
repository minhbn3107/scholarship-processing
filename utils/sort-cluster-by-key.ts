import { ClusterWorksheetsState } from "@/lib/features/cluster-worksheet/cluster-worksheet-slice";

export default function sortClusterWorkSheetByKey(obj: ClusterWorksheetsState) {
    const keys = Object.keys(obj);

    const sortedKeys = keys.sort((a, b) => a.localeCompare(b));

    const sortedObj: ClusterWorksheetsState = {};

    for (const key of sortedKeys) {
        sortedObj[key] = obj[key];
    }

    return sortedObj;
}
