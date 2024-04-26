"use client";

import React, { useState } from "react";

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
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
    PercentScholarshipRecipientsState,
    selectPercentScholarshipRecipients,
    setPercentScholarshipRecipients,
} from "@/lib/features/percent-scholarship-recipients/percent-scholarship-recipients-slice";

export default function InputPercentScholarshipRecipients() {
    const [formData, setFormData] = useState<PercentScholarshipRecipientsState>(
        [[]]
    );
    const [open, setOpen] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const percentScholarshipRecipients = useAppSelector(
        selectPercentScholarshipRecipients
    );

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        rowIndex: number,
        colIndex: number
    ) => {
        const value = e.target.value;
        const parsedValue = parseFloat(value.replace(",", "."));
        const newValue = isNaN(parsedValue) ? 0 : parsedValue;
        setFormData((prevData) => {
            const newData = [...prevData];
            newData[rowIndex][colIndex] = newValue;
            return newData;
        });
    };

    const handleAdd = () => {
        setFormData((prevData) => [...prevData, []]);
    };

    const handleClear = () => {
        setFormData([[]]);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
            <DialogContent className="sm:max-w-[400px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>
                            Input Percent Scholarship Recipients
                        </DialogTitle>
                        <DialogDescription>
                            Cột 1 là phần trăm học sinh, Cột 2 là phần trăm số
                            tiền được nhận
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4 max-h-96 overflow-y-auto">
                        {formData.map((row, rowIndex) => (
                            <div
                                key={rowIndex}
                                className="grid grid-cols-8 items-center gap-4"
                            >
                                <div className="col-span-4 relative">
                                    <Input
                                        type="text"
                                        required
                                        onChange={(e) =>
                                            handleChange(e, rowIndex, 0)
                                        }
                                        pattern="[0-9,.]*"
                                        value={formData[rowIndex][0] || ""}
                                        className="w-full pr-12"
                                    />
                                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                        %
                                    </span>
                                </div>
                                <div className="col-span-4 relative">
                                    <Input
                                        type="text"
                                        required
                                        onChange={(e) =>
                                            handleChange(e, rowIndex, 1)
                                        }
                                        pattern="[0-9,.]*"
                                        value={formData[rowIndex][1] || ""}
                                        className="w-full pr-12"
                                    />
                                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                        %
                                    </span>
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
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
