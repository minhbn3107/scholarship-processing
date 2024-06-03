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
import { ClusterWorksheetState } from "@/lib/features/cluster-worksheet/cluster-worksheet-slice";
import { useAppDispatch } from "@/lib/hooks";
import { BsInputCursorText } from "react-icons/bs";
import {
    TotalStudentsState,
    setTotalStudent,
} from "@/lib/features/total-students/total-students-slice";

interface InputTotalStudentsProps {
    clusterData: ClusterWorksheetState;
    disabled: boolean;
}

export default function InputTotalStudents({
    clusterData,
    disabled,
}: InputTotalStudentsProps) {
    const [formData, setFormData] = useState<TotalStudentsState>({});
    const [open, setOpen] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const isValidInput = /^[0-9]*$/.test(value);
        if (isValidInput) {
            setFormData((prevData) => ({
                ...prevData,
                [name]: Number(value),
            }));
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(setTotalStudent(formData));
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="default" disabled={disabled}>
                    <BsInputCursorText className="mr-2 size-4" />
                    Nhập Sỉ Số Của Khoa và Khóa
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Nhập Sỉ Số Của Khoa và Khóa</DialogTitle>
                        <DialogDescription></DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4 pr-2 max-h-96 overflow-y-auto">
                        {Object.keys(clusterData).map((key) => (
                            <div
                                className="grid grid-cols-10 items-center gap-4"
                                key={key}
                            >
                                <Label
                                    htmlFor={key}
                                    className="text-left col-span-7"
                                >
                                    {key}
                                </Label>
                                <Input
                                    id={key}
                                    name={key}
                                    type="number"
                                    required
                                    min="0"
                                    onChange={handleChange}
                                    value={formData[key] || ""}
                                    className="col-span-3"
                                />
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
