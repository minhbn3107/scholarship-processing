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
import { Label } from "@/components/ui/label";
import { BsInputCursorText } from "react-icons/bs";
import { ClusterWorksheetState } from "@/lib/features/cluster-worksheet/cluster-worksheet-slice";
import { useAppDispatch } from "@/lib/hooks";
import {
    BaseScholarshipPriceState,
    setBaseScholarshipPrice,
} from "@/lib/features/base-scholarship-price/base-scholarship-price-slice";
import formatCurrency from "@/utils/format-currency";

interface InputBaseScholarshipPriceProps {
    clusterData: ClusterWorksheetState;
    disabled: boolean;
}

export default function InputBaseScholarshipPrice({
    clusterData,
    disabled,
}: InputBaseScholarshipPriceProps) {
    const [formData, setFormData] = useState<Record<string, number>>({});
    const [open, setOpen] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const numberValue = parseInt(value.replace(/\D/g, ""));
        setFormData((prevData) => ({
            ...prevData,
            [name]: numberValue,
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const baseScholarshipPrice: BaseScholarshipPriceState = {};

        for (const key in formData) {
            const clusterName = key.includes("-TT") ? key.split("-TT")[0] : key;
            if (!baseScholarshipPrice[clusterName]) {
                baseScholarshipPrice[clusterName] = [];
            }
            baseScholarshipPrice[clusterName].push(formData[key]);
        }
        // console.log(baseScholarshipPrice);

        dispatch(setBaseScholarshipPrice(baseScholarshipPrice));
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="default" disabled={disabled}>
                    <BsInputCursorText className="mr-2 h-4 w-4" />
                    Nhập Tiền Học Bổng Của Khoa và Khóa
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>
                            Nhập Tiền Học Bổng Của Khoa và Khóa
                        </DialogTitle>
                        <DialogDescription>
                            Cột 1 cho hệ chính quy, Cột 2 cho hệ tiên tiến
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4 max-h-96 overflow-y-auto">
                        {Object.keys(clusterData).map((key) => (
                            <div
                                className="grid grid-cols-12 items-center gap-4"
                                key={key}
                            >
                                <Label
                                    htmlFor={key}
                                    className="text-left col-span-4"
                                >
                                    {key}
                                </Label>
                                <div className="col-span-4 relative">
                                    <Input
                                        id={key}
                                        name={key}
                                        type="text"
                                        required
                                        onChange={handleChange}
                                        value={
                                            formData[key] !== undefined &&
                                            !isNaN(formData[key])
                                                ? formatCurrency(formData[key])
                                                : ""
                                        }
                                        className="w-full pr-12"
                                    />
                                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                        VND
                                    </span>
                                </div>
                                <div className="col-span-4 relative">
                                    <Input
                                        id={`${key}-TT`}
                                        name={`${key}-TT`}
                                        type="text"
                                        required
                                        onChange={handleChange}
                                        value={
                                            formData[`${key}-TT`] !==
                                                undefined &&
                                            !isNaN(formData[`${key}-TT`])
                                                ? formatCurrency(
                                                      formData[`${key}-TT`]
                                                  )
                                                : ""
                                        }
                                        className="w-full pr-12"
                                    />
                                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                        VND
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <DialogFooter>
                        <Button type="submit">Lưu Thay Đổi</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
