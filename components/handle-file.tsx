"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import {
    WorksheetsState,
    selectWorksheets,
    setWorksheets,
} from "@/lib/features/worksheet/worksheet-slice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
    HeaderRowState,
    selectHeaderRow,
    setHeaderRow,
} from "@/lib/features/header-row/header-row-slice";
import {
    ClusterWorksheetState,
    selectClusterWorksheet,
    setClusterWorksheet,
} from "@/lib/features/cluster-worksheet/cluster-worksheet-slice";

import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
import { CiFilter } from "react-icons/ci";
import { GrSort } from "react-icons/gr";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";
import WorkSheetPage from "./worksheet";
import Loading from "./loading";
import InputTotalStudents from "./input-total-students";
import InputScholarshipPrice from "./input-scholarship-price";
import InputScholarshipCondition from "./input-scholarship-condition";
import sortClusterWorkSheetByKey from "@/utils/sort-cluster-by-key";
import HandleRenderData from "./handle-render-data";
import { setFilteredWorksheet } from "@/lib/features/filtered-worksheet/filtered-worksheet-slice";
// import {
//     headerRow,
//     clusterWorksheet,
//     totalStudents,
//     baseScholarshipPrice,
//     exceptionBaseScholarshipPrice,
//     scholarshipCondition,
// } from "@/sample-data";
import {
    TotalStudentsState,
    selectTotalStudent,
} from "@/lib/features/total-students/total-students-slice";
import {
    BaseScholarshipPriceState,
    selectBaseScholarshipPrice,
} from "@/lib/features/base-scholarship-price/base-scholarship-price-slice";
import {
    ScholarshipConditionState,
    selectScholarshipCondition,
} from "@/lib/features/scholarship-condition/scholarship-condition-slice";
import DownloadFile from "./download-file";
import {
    ExceptionBaseScholarshipPriceState,
    selectExceptionBaseScholarshipPrice,
} from "@/lib/features/exception-base-scholarship-price/exception-base-scholarship-price-slice";

export default function HandleFile() {
    const [files, setFiles] = useState<FileList | null>(null);
    const [selectedWorksheet, setSelectedWorksheet] = useState<any[][]>([]);
    const [isSelectedClusterWorksheet, setIsSelectedClusterWorksheet] =
        useState<boolean>(false);
    const [isSelectedFilteredWorksheet, setIsSelectedFilteredWorksheet] =
        useState<boolean>(false);
    const [hasFiles, setHasFiles] = useState<boolean>(false);
    const [allowCluster, setAllowCluster] = useState<boolean>(false);
    const [isFiltered, setIsFiltered] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const worksheets: WorksheetsState = useAppSelector(selectWorksheets);
    const clusterWorksheet: ClusterWorksheetState = useAppSelector(
        selectClusterWorksheet
    );
    const headerRow: HeaderRowState = useAppSelector(selectHeaderRow);
    const totalStudents: TotalStudentsState =
        useAppSelector(selectTotalStudent);
    const baseScholarshipPrice: BaseScholarshipPriceState = useAppSelector(
        selectBaseScholarshipPrice
    );
    const scholarshipCondition: ScholarshipConditionState = useAppSelector(
        selectScholarshipCondition
    );
    const exceptionBaseScholarshipPrice: ExceptionBaseScholarshipPriceState =
        useAppSelector(selectExceptionBaseScholarshipPrice);
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
            toast.info(`Đang Tải ${files.item(i)?.name}...`, {
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
            toast.success(`Tải Lên ${files.item(i)?.name} Hoàn Tất!`, {
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
        setIsSelectedFilteredWorksheet(false);
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
        setIsSelectedFilteredWorksheet(false);
        setIsSelectedClusterWorksheet(true);
        setIsLoading(false);
    };

    const handleFilter = () => {
        setIsLoading(true);
        dispatch(
            setFilteredWorksheet({
                headerRow,
                clusterWorksheet,
                totalStudents,
                baseScholarshipPrice,
                exceptionBaseScholarshipPrice,
                scholarshipCondition,
            })
        );
        setIsFiltered(true);
        setIsLoading(false);
    };

    const handleFilterWorksheetClick = () => {
        setIsLoading(true);
        setSelectedWorksheet([]);
        setIsSelectedClusterWorksheet(false);
        setIsSelectedFilteredWorksheet(true);
        setIsLoading(false);
    };

    return (
        <>
            {isLoading && <Loading />}
            <div className="flex gap-4 w-full">
                <div className="grid max-w-sm items-center gap-1.5 w-1/2">
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
                        <PiMicrosoftExcelLogoFill className="mr-2 size-4" /> Đọc
                        File
                    </Button>
                    <Button
                        onClick={handleCluster}
                        disabled={!allowCluster || !hasFiles}
                    >
                        <GrSort className="mr-2 size-4" /> Phân Chia Theo Khóa
                        Và Khoa
                    </Button>
                    <InputTotalStudents
                        clusterData={sortedClusterWorksheet}
                        disabled={Object.keys(clusterWorksheet).length === 0}
                    />
                    <InputScholarshipPrice
                        clusterData={sortedClusterWorksheet}
                        disabled={Object.keys(clusterWorksheet).length === 0}
                    />
                    <InputScholarshipCondition />
                    <Button
                        onClick={handleFilter}
                        disabled={
                            !(
                                headerRow.length !== 0 &&
                                Object.keys(clusterWorksheet).length !== 0 &&
                                Object.keys(totalStudents).length !== 0 &&
                                Object.keys(baseScholarshipPrice).length !==
                                    0 &&
                                scholarshipCondition.length !== 0
                            )
                        }
                    >
                        <CiFilter className="mr-2 size-4" />
                        Lọc Dữ Liệu Theo Điều Kiện
                    </Button>
                    <DownloadFile
                        setIsLoading={setIsLoading}
                        headerRow={headerRow}
                    />
                </div>
                <WorkSheetPage
                    worksheets={worksheets}
                    handleWorksheetClick={handleWorksheetClick}
                    selectedWorksheet={selectedWorksheet}
                    clustered={Object.keys(clusterWorksheet).length !== 0}
                    handleClusterWorksheetClick={handleClusterWorksheetClick}
                    isSelectedClusterWorksheet={isSelectedClusterWorksheet}
                    filtered={
                        headerRow.length !== 0 &&
                        Object.keys(clusterWorksheet).length !== 0 &&
                        Object.keys(totalStudents).length !== 0 &&
                        Object.keys(baseScholarshipPrice).length !== 0 &&
                        scholarshipCondition.length !== 0 &&
                        isFiltered
                    }
                    handleFilterWorksheetClick={handleFilterWorksheetClick}
                    isSelectedFilteredWorksheet={isSelectedFilteredWorksheet}
                />
            </div>
            <HandleRenderData
                selectedWorksheet={selectedWorksheet}
                isSelectedClusterWorksheet={isSelectedClusterWorksheet}
                clusterWorksheet={clusterWorksheet}
                isSelectedFilteredWorksheet={isSelectedFilteredWorksheet}
            />
        </>
    );
}
