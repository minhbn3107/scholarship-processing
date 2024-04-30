"use client";

import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
    PercentScholarshipRecipientsState,
    setPercentScholarshipRecipients,
    selectPercentScholarshipRecipients,
} from "@/lib/features/percent-scholarship-recipients/percent-scholarship-recipients-slice";
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

export default function InputPercentScholarshipRecipients() {
    const dispatch = useAppDispatch();
    const percentScholarshipRecipients = useAppSelector(
        selectPercentScholarshipRecipients
    );
    const [open, setOpen] = useState<boolean>(false);
    const [formData, setFormData] = useState<PercentScholarshipRecipientsState>(
        percentScholarshipRecipients.slice()
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
        dispatch(setPercentScholarshipRecipients(formData));
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="default">
                    Input Percent Scholarship Recipients
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px]">
                <form onSubmit={handleSaveChanges}>
                    <DialogHeader>
                        <DialogTitle>
                            Input Percent Scholarship Recipients
                        </DialogTitle>
                        <DialogDescription>
                            Cột 1 là phần trăm học sinh, Cột 2 là phần trăm số
                            tiền được nhận, Cột 3 là loại học lực, Cột 4 là loại
                            hạnh kiểm
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4 max-h-96 overflow-y-auto">
                        {formData.map((row, rowIndex) => (
                            <div
                                key={rowIndex}
                                className="grid grid-cols-10 items-center gap-4"
                            >
                                <div className="col-span-2 relative">
                                    <Input
                                        type="number"
                                        required
                                        min={0}
                                        onChange={(e) =>
                                            handleChange(
                                                rowIndex,
                                                0,
                                                e.target.value
                                            )
                                        }
                                        pattern="[0-9,.]*"
                                        value={row[0] || 0}
                                        className="w-full pr-12"
                                    />
                                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                        %
                                    </span>
                                </div>
                                <div className="col-span-2 relative">
                                    <Input
                                        type="number"
                                        required
                                        min={0}
                                        onChange={(e) =>
                                            handleChange(
                                                rowIndex,
                                                1,
                                                e.target.value
                                            )
                                        }
                                        pattern="[0-9,.]*"
                                        value={row[1] || 0}
                                        className="w-full pr-12"
                                    />
                                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                        %
                                    </span>
                                </div>
                                <div className="col-span-2">
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
                                            <SelectItem value="Xuất sắc">
                                                Xuất sắc
                                            </SelectItem>
                                            <SelectItem value="Giỏi">
                                                Giỏi
                                            </SelectItem>
                                            <SelectItem value="Khá">
                                                Khá
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="col-span-2">
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
                                            <SelectItem value="Xuất sắc">
                                                Xuất sắc
                                            </SelectItem>
                                            <SelectItem value="Tốt">
                                                Tốt
                                            </SelectItem>
                                            <SelectItem value="Khá">
                                                Khá
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="col-span-2">
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        onClick={() => handleDelete(rowIndex)}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <DialogFooter>
                        <Button type="button" onClick={handleAdd}>
                            Add
                        </Button>
                        <Button type="button" onClick={handleClear}>
                            Clear
                        </Button>
                        <Button type="submit">Save Changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
