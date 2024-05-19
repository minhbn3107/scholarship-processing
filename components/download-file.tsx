"use client";

import React, { SetStateAction, useState } from "react";
import { useAppSelector } from "@/lib/hooks";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { MdFileDownload } from "react-icons/md";
import {
    FilteredWorksheetsState,
    selectFilteredWorksheet,
} from "@/lib/features/filtered-worksheet/filtered-worksheet-slice";
import exportToExcel from "@/utils/write-file";
import { saveAs } from "file-saver";
import { HeaderRowState } from "@/lib/features/header-row/header-row-slice";
import { defaultNamingFile } from "@/utils/default-naming-file";

interface DownloadFileProps {
    setIsLoading: (value: SetStateAction<boolean>) => void;
    headerRow: HeaderRowState;
}

export default function DownloadFile({
    setIsLoading,
    headerRow,
}: DownloadFileProps) {
    const [formData, setFormData] = useState<string>(defaultNamingFile());
    const [open, setOpen] = useState<boolean>(false);
    const filteredWorksheet: FilteredWorksheetsState = useAppSelector(
        selectFilteredWorksheet
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        const workbook = await exportToExcel(filteredWorksheet, headerRow);

        workbook.xlsx.writeBuffer().then((buffer: Buffer) => {
            const blob = new Blob([buffer], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            });

            saveAs(blob, formData);
        });
        setOpen(false);
        setIsLoading(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="default"
                    disabled={Object.keys(filteredWorksheet).length === 0}
                >
                    <MdFileDownload className="mr-2 h-4 w-4" />
                    Xuất file
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Nhập tên file xuất ra</DialogTitle>
                        <DialogDescription></DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4 max-h-96 overflow-y-auto">
                        <Input
                            type="text"
                            required
                            min="0"
                            onChange={handleChange}
                            value={formData}
                            className="col-span-3"
                        />
                    </div>
                    <DialogFooter>
                        <Button type="submit" variant="green">
                            <MdFileDownload className="mr-2 h-4 w-4" />
                            Xuất file
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
