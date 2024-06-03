"use client";

import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
    ScholarshipConditionState,
    setScholarshipCondition,
    selectScholarshipCondition,
} from "@/lib/features/scholarship-condition/scholarship-condition-slice";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { BsInputCursorText } from "react-icons/bs";
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    academicPerformanceOrder,
    conductOrder,
} from "@/utils/raking-variable";

export default function InputScholarshipCondition() {
    const dispatch = useAppDispatch();
    const scholarshipCondition = useAppSelector(selectScholarshipCondition);
    const [open, setOpen] = useState<boolean>(false);
    const [formData, setFormData] = useState<ScholarshipConditionState>(
        scholarshipCondition.slice()
    );

    const handleChange = (
        rowIndex: number,
        colIndex: number,
        value: string
    ) => {
        const parsedValue = parseFloat(value);
        const newValue = isNaN(parsedValue) ? 0 : parsedValue;
        setFormData((prevData) =>
            prevData.map((row, idx) =>
                idx === rowIndex
                    ? [
                          colIndex === 0 ? newValue : row[0],
                          colIndex === 1 ? newValue : row[1],
                          row[2],
                          row[3],
                      ]
                    : row
            )
        );
    };

    const handleSelectChange = (
        rowIndex: number,
        colIndex: number,
        value: string
    ) => {
        setFormData((prevData) =>
            prevData.map((row, idx) =>
                idx === rowIndex
                    ? [
                          row[0],
                          row[1],
                          colIndex === 2 ? value : row[2],
                          colIndex === 3 ? value : row[3],
                      ]
                    : row
            )
        );
    };

    const handleAdd = () => {
        setFormData((prevData) => [...prevData, [0, 0, "", ""]]);
    };

    const handleClear = () => {
        setFormData([]);
    };

    const handleDelete = (rowIndex: number) => {
        setFormData((prevData) =>
            prevData.filter((_, idx) => idx !== rowIndex)
        );
    };

    const handleSaveChanges = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(setScholarshipCondition(formData));
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="default">
                    <BsInputCursorText className="mr-2 size-4" />
                    Nhập Điều Kiện Học Bổng
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px]">
                <form onSubmit={handleSaveChanges}>
                    <DialogHeader>
                        <DialogTitle>Nhập Điều Kiện Học Bổng</DialogTitle>
                        <DialogDescription>
                            Cột 1 là phần trăm học sinh, Cột 2 là phần trăm số
                            tiền được nhận, Cột 3 là loại học lực, Cột 4 là loại
                            hạnh kiểm
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4 pl-2 max-h-96 overflow-y-auto">
                        {formData.map((row, rowIndex) => (
                            <div
                                key={rowIndex}
                                className="grid grid-cols-12 items-center gap-4"
                            >
                                <div className="col-span-2 relative">
                                    <Input
                                        type="number"
                                        required
                                        onChange={(e) =>
                                            handleChange(
                                                rowIndex,
                                                0,
                                                e.target.value
                                            )
                                        }
                                        value={row[0] || 0}
                                        className="w-full pr-8"
                                    />
                                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                        %
                                    </span>
                                </div>
                                <div className="col-span-2 relative">
                                    <Input
                                        type="number"
                                        required
                                        onChange={(e) =>
                                            handleChange(
                                                rowIndex,
                                                1,
                                                e.target.value
                                            )
                                        }
                                        value={row[1] || 0}
                                        className="w-full pr-8"
                                    />
                                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                        %
                                    </span>
                                </div>
                                <div className="col-span-3">
                                    <Select
                                        onValueChange={(value) =>
                                            handleSelectChange(
                                                rowIndex,
                                                2,
                                                value
                                            )
                                        }
                                        value={row[2]}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Chọn học lực" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {academicPerformanceOrder.map(
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
                                <div className="col-span-3">
                                    <Select
                                        onValueChange={(value) =>
                                            handleSelectChange(
                                                rowIndex,
                                                3,
                                                value
                                            )
                                        }
                                        value={row[3]}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Chọn hạnh kiểm" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {conductOrder.map((value) => (
                                                <SelectItem
                                                    key={value}
                                                    value={value}
                                                >
                                                    {value}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="col-span-2 text-center">
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        onClick={() => handleDelete(rowIndex)}
                                    >
                                        <IoIosRemoveCircleOutline />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <DialogFooter>
                        <Button type="button" onClick={handleAdd}>
                            Thêm
                        </Button>
                        <Button type="button" onClick={handleClear}>
                            Xóa hết
                        </Button>
                        <Button type="submit">Lưu Thay Đổi</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
