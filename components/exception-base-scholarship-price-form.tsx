"use client";

import { useState } from "react";
import {
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    ExceptionBaseScholarshipPriceState,
    deleteExceptionBaseScholarshipPrice,
    selectExceptionBaseScholarshipPrice,
    setExceptionBaseScholarshipPrice,
} from "@/lib/features/exception-base-scholarship-price/exception-base-scholarship-price-slice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { ClusterWorksheetState } from "@/lib/features/cluster-worksheet/cluster-worksheet-slice";
import { Button } from "./ui/button";
import { IoIosRemoveCircleOutline } from "react-icons/io";

interface ExceptionBaseScholarshipPriceFormProps {
    setOpen: (value: boolean) => void;
    clusterData: ClusterWorksheetState;
}

export default function ExceptionBaseScholarshipPriceForm({
    setOpen,
    clusterData,
}: ExceptionBaseScholarshipPriceFormProps) {
    const dispatch = useAppDispatch();
    const exceptionBaseScholarshipPrice = useAppSelector(
        selectExceptionBaseScholarshipPrice
    );
    const [exceptionFormData, setExceptionFormData] =
        useState<ExceptionBaseScholarshipPriceState>(
            exceptionBaseScholarshipPrice
                ? { ...exceptionBaseScholarshipPrice }
                : {}
        );
    const [newEntry, setNewEntry] = useState<[number, number, string]>([
        0,
        0,
        "",
    ]);
    const [selectedKey, setSelectedKey] = useState<string | undefined>(
        undefined
    );

    const handleExceptionSaveChanges = (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();
        // console.log(exceptionFormData);
        dispatch(setExceptionBaseScholarshipPrice(exceptionFormData));
        setOpen(false);
    };

    const handleAddEntry = () => {
        if (selectedKey) {
            setExceptionFormData({
                ...exceptionFormData,
                [selectedKey]: newEntry,
            });
            setSelectedKey(undefined);
            setNewEntry([0, 0, ""]);
        }
    };

    const handleDeleteEntry = (key: string) => {
        dispatch(deleteExceptionBaseScholarshipPrice(key));
        setExceptionFormData((prevEntry) => {
            const newEntry = { ...prevEntry };
            delete newEntry[key];
            return newEntry;
        });
    };

    const handleDeleteAll = () => {
        Object.keys(exceptionFormData).forEach((key) => {
            dispatch(deleteExceptionBaseScholarshipPrice(key));
        });
        setExceptionFormData({});
    };

    const handleDataChange = (
        key: string,
        exceptionLowScholarshipPrice: number,
        exceptionHighScholarshipPrice: number,
        className: string
    ) => {
        setExceptionFormData({
            ...exceptionFormData,
            [key]: [
                exceptionLowScholarshipPrice,
                exceptionHighScholarshipPrice,
                className,
            ],
        });
    };

    return (
        <form onSubmit={handleExceptionSaveChanges}>
            <DialogHeader>
                <DialogTitle>Thêm Điều Kiện Ngoại Lệ</DialogTitle>
                <DialogDescription>
                    Cột 1 nhập mã lớp, Cột 2 cho hệ chính quy, Cột 3 cho hệ tiên
                    tiến
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4 pl-2 overflow-y-auto">
                {Object.entries(exceptionFormData).map(
                    ([
                        key,
                        [
                            exceptionLowScholarshipPrice,
                            exceptionHighScholarshipPrice,
                            className,
                        ],
                    ]) => (
                        <div
                            key={key}
                            className="grid grid-cols-12 items-center gap-4 pr-2 py-2 border-solid border-y-2"
                        >
                            <div className="col-span-10">
                                <Select
                                    value={key}
                                    onValueChange={(value) =>
                                        handleDataChange(
                                            value,
                                            exceptionLowScholarshipPrice,
                                            exceptionHighScholarshipPrice,
                                            className
                                        )
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Chọn Khoa" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.keys(clusterData).map(
                                            (value) => (
                                                <SelectItem
                                                    key={value}
                                                    value={value}
                                                >
                                                    {value}
                                                </SelectItem>
                                            )
                                        )}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="col-span-2 text-center">
                                <Button
                                    type="button"
                                    variant="destructive"
                                    onClick={() => handleDeleteEntry(key)}
                                >
                                    <IoIosRemoveCircleOutline />
                                </Button>
                            </div>
                            <Label className="text-left col-span-1">
                                Mã lớp
                            </Label>
                            <div className="col-span-3 relative">
                                <Input
                                    type="text"
                                    value={className}
                                    onChange={(e) =>
                                        handleDataChange(
                                            key,
                                            exceptionLowScholarshipPrice,
                                            exceptionHighScholarshipPrice,
                                            e.target.value
                                        )
                                    }
                                    required
                                    className="w-full pr-12"
                                />
                            </div>
                            <div className="col-span-4 relative">
                                <Input
                                    type="text"
                                    value={exceptionLowScholarshipPrice}
                                    onChange={(e) =>
                                        handleDataChange(
                                            key,
                                            Number(e.target.value),
                                            exceptionHighScholarshipPrice,
                                            className
                                        )
                                    }
                                    required
                                    className="w-full pr-12"
                                />
                                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                    VND
                                </span>
                            </div>
                            <div className="col-span-4 relative">
                                <Input
                                    type="text"
                                    value={exceptionHighScholarshipPrice}
                                    onChange={(e) =>
                                        handleDataChange(
                                            key,
                                            exceptionLowScholarshipPrice,
                                            Number(e.target.value),
                                            className
                                        )
                                    }
                                    required
                                    className="w-full pr-12"
                                />
                                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                    VND
                                </span>
                            </div>
                        </div>
                    )
                )}
                <div className="grid grid-cols-12 items-center gap-4 pr-2 py-2 border-solid border-y-2">
                    <div className="col-span-10">
                        <Select
                            value={selectedKey}
                            onValueChange={(value) => setSelectedKey(value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Chọn Khoa" />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.keys(clusterData).map((value) => (
                                    <SelectItem key={value} value={value}>
                                        {value}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="col-span-2 text-center">
                        <Button type="button" onClick={handleAddEntry}>
                            Thêm
                        </Button>
                    </div>
                    {selectedKey && (
                        <>
                            <Label className="text-left col-span-1">
                                Mã lớp
                            </Label>
                            <div className="col-span-3 relative">
                                <Input
                                    type="text"
                                    value={newEntry[2]}
                                    onChange={(e) =>
                                        setNewEntry([
                                            newEntry[0],
                                            newEntry[1],
                                            e.target.value,
                                        ])
                                    }
                                    required
                                    className="w-full pr-12"
                                />
                            </div>
                            <div className="col-span-4 relative">
                                <Input
                                    type="text"
                                    value={newEntry[0]}
                                    onChange={(e) =>
                                        setNewEntry([
                                            Number(e.target.value),
                                            newEntry[1],
                                            newEntry[2],
                                        ])
                                    }
                                    required
                                    className="w-full pr-12"
                                />
                                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                    VND
                                </span>
                            </div>
                            <div className="col-span-4 relative">
                                <Input
                                    type="text"
                                    value={newEntry[1]}
                                    onChange={(e) =>
                                        setNewEntry([
                                            newEntry[0],
                                            Number(e.target.value),
                                            newEntry[2],
                                        ])
                                    }
                                    required
                                    className="w-full pr-12"
                                />
                                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                    VND
                                </span>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <DialogFooter>
                <Button type="button" onClick={handleDeleteAll}>
                    Xóa Hết
                </Button>
                <Button type="submit">Lưu Thay Đổi</Button>
            </DialogFooter>
        </form>
    );
}
