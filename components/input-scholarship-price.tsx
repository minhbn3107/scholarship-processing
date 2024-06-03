"use client";

import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { BsInputCursorText } from "react-icons/bs";
import { ClusterWorksheetState } from "@/lib/features/cluster-worksheet/cluster-worksheet-slice";
import formatCurrency from "@/utils/format-currency";
import BaseScholarshipPriceForm from "./base-scholarship-price-form";
import ExceptionBaseScholarshipPriceForm from "./exception-base-scholarship-price-form";

interface InputBaseScholarshipPriceProps {
    clusterData: ClusterWorksheetState;
    disabled: boolean;
}

export default function InputScholarshipPrice({
    clusterData,
    disabled,
}: InputBaseScholarshipPriceProps) {
    const [openBaseScholarshipPrice, setBaseScholarshipPriceOpen] =
        useState<boolean>(false);
    const [
        openExceptionBaseScholarshipPrice,
        setExceptionBaseScholarshipPriceOpen,
    ] = useState<boolean>(false);

    return (
        <>
            <Dialog
                open={openBaseScholarshipPrice}
                onOpenChange={setBaseScholarshipPriceOpen}
            >
                <DialogTrigger asChild>
                    <Button variant="default" disabled={disabled}>
                        <BsInputCursorText className="mr-2 size-4" />
                        Nhập Tiền Học Bổng Của Khoa và Khóa
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[800px] max-h-full overflow-y-auto">
                    <BaseScholarshipPriceForm
                        setOpen={setBaseScholarshipPriceOpen}
                        clusterData={clusterData}
                    />
                </DialogContent>
            </Dialog>
            <Dialog
                open={openExceptionBaseScholarshipPrice}
                onOpenChange={setExceptionBaseScholarshipPriceOpen}
            >
                <DialogTrigger asChild>
                    <Button variant="default" disabled={disabled}>
                        <BsInputCursorText className="mr-2 size-4" />
                        Nhập Ngoại Lệ Của Tiền Học Bổng
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[800px] max-h-full overflow-y-auto">
                    <ExceptionBaseScholarshipPriceForm
                        setOpen={setExceptionBaseScholarshipPriceOpen}
                        clusterData={clusterData}
                    />
                </DialogContent>
            </Dialog>
        </>
    );
}
