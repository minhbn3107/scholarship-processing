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
import { ClusterWorksheetsState } from "@/lib/features/cluster-worksheet/cluster-worksheet-slice";
import { useAppDispatch } from "@/lib/hooks";
import {
    TotalStudentsState,
    setTotalStudent,
} from "@/lib/features/total-students/total-students-slice";

interface InputTotalStudentsProps {
    clusterData: ClusterWorksheetsState;
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
        setFormData((prevData) => ({
            ...prevData,
            [name]: Number(value),
        }));
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
                    Input Total
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Input Total Students</DialogTitle>
                        <DialogDescription>
                            Input total students
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4 max-h-96 overflow-y-auto">
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
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
