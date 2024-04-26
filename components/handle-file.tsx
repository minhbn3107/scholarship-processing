"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import {
    WorksheetsState,
    selectWorksheets,
    setWorksheets,
} from "@/lib/features/worksheet/worksheet-slice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setHeaderRow } from "@/lib/features/header-row/header-row-slice";
import {
    ClusterWorksheetsState,
    selectClusterWorksheet,
    setClusterWorksheet,
} from "@/lib/features/cluster-worksheet/cluster-worksheet-slice";

import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
import { CiFilter } from "react-icons/ci";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";
import WorkSheetPage from "./worksheet";
import Loading from "./loading";
import InputTotalStudents from "./input-total-students";
import InputBaseScholarshipPrice from "./input-base-scholarship-price";
import InputPercentScholarshipRecipients from "./input-percent-scholarship-recipients";
import sortClusterWorkSheetByKey from "@/utils/sort-cluster-by-key";
import HandleRenderData from "./handle-render-data";

export default function HandleFile() {
    const [files, setFiles] = useState<FileList | null>(null);
    const [selectedWorksheet, setSelectedWorksheet] = useState<any[][]>([]);
    const [isSelectedClusterWorksheet, setIsSelectedClusterWorksheet] =
        useState<boolean>(false);
    const [hasFiles, setHasFiles] = useState<boolean>(false);
    const [allowCluster, setAllowCluster] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const worksheets: WorksheetsState = useAppSelector(selectWorksheets);
    const clusterWorksheet: ClusterWorksheetsState = useAppSelector(
        selectClusterWorksheet
    );
    const sortedClusterWorksheet = sortClusterWorkSheetByKey(clusterWorksheet);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setHeaderRow(worksheets));
    }, [worksheets, dispatch]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFiles(event.target.files);
    };

    const handleSubmit = async () => {
        if (!files) return;
        setIsLoading(true);

        const worksheetsData: WorksheetsState = {};

        for (let i = 0; i < files.length; i++) {
            toast.info(`Loading ${files.item(i)?.name}...`, {
                action: {
                    label: "Close",
                    onClick: () => {},
                },
            });
            const file = files.item(i);
            if (file) {
                const formData = new FormData();
                formData.append("file", file);

                try {
                    const response = await axios.post("/api/excel", formData);
                    const data = await response.data;
                    Object.assign(worksheetsData, data);
                } catch (error) {
                    console.error(`Error uploading file ${file.name}:`, error);
                }
            }
            toast.success(`Loading ${files.item(i)?.name} completed!`, {
                action: {
                    label: "Close",
                    onClick: () => {},
                },
            });
        }

        dispatch(setWorksheets(worksheetsData));
        setIsLoading(false);
        setHasFiles(true);
        setAllowCluster(true);
    };

    const handleWorksheetClick = (sheetName: string) => {
        setIsLoading(true);
        setIsSelectedClusterWorksheet(false);
        const worksheet = worksheets[sheetName];
        // console.log(worksheet);
        setSelectedWorksheet(worksheet);
        setIsLoading(false);
    };

    const handleCluster = () => {
        setIsLoading(true);
        dispatch(setClusterWorksheet(worksheets));
        setIsLoading(false);
        setAllowCluster(false);
    };

    const handleClusterWorksheetClick = () => {
        setIsLoading(true);
        setSelectedWorksheet([]);
        setIsSelectedClusterWorksheet(true);
        setIsLoading(false);
    };

    return (
        <>
            {isLoading && <Loading />}
            <div className="flex gap-4 w-full">
                <div className="grid max-w-sm items-center gap-1.5 flex-shrink-0">
                    <Input
                        type="file"
                        onChange={handleFileChange}
                        accept=".xlsx,.xls"
                        multiple
                    />
                    <Button
                        onClick={handleSubmit}
                        disabled={hasFiles || !files}
                        className="w-full"
                    >
                        <PiMicrosoftExcelLogoFill className="mr-2 h-4 w-4" />{" "}
                        Read Excel Files
                    </Button>
                    <Button
                        onClick={handleCluster}
                        disabled={!allowCluster || !hasFiles}
                    >
                        <CiFilter className="mr-2 h-4 w-4" /> Cluster
                    </Button>
                    <InputTotalStudents
                        clusterData={sortedClusterWorksheet}
                        disabled={Object.keys(clusterWorksheet).length === 0}
                    />
                    <InputBaseScholarshipPrice
                        clusterData={sortedClusterWorksheet}
                        disabled={Object.keys(clusterWorksheet).length === 0}
                    />
                    <InputPercentScholarshipRecipients />
                </div>
                <WorkSheetPage
                    worksheets={worksheets}
                    handleWorksheetClick={handleWorksheetClick}
                    selectedWorksheet={selectedWorksheet}
                    clustered={Object.keys(clusterWorksheet).length !== 0}
                    handleClusterWorksheetClick={handleClusterWorksheetClick}
                    isSelectedClusterWorksheet={isSelectedClusterWorksheet}
                />
            </div>
            <HandleRenderData
                selectedWorksheet={selectedWorksheet}
                isSelectedClusterWorksheet={isSelectedClusterWorksheet}
                clusterWorksheet={clusterWorksheet}
            />
        </>
    );
}
