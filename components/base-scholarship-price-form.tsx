"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ClusterWorksheetState } from "@/lib/features/cluster-worksheet/cluster-worksheet-slice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
    BaseScholarshipPriceState,
    setBaseScholarshipPrice,
} from "@/lib/features/base-scholarship-price/base-scholarship-price-slice";
import { economyGroup, techniqueGroup } from "@/utils/faculty-group";
import formatCurrency from "@/utils/format-currency";
import { filterCourseOfFaculty } from "@/utils/filter-course-of-faculty";

interface BaseScholarshipPriceFormProps {
    setOpen: (value: React.SetStateAction<boolean>) => void;
    clusterData: ClusterWorksheetState;
}

export default function BaseScholarshipPriceForm({
    setOpen,
    clusterData,
}: BaseScholarshipPriceFormProps) {
    const [formData, setFormData] = useState<Record<string, number>>({});
    const [economyData, setEconomyData] = useState<{
        [key: string]: number | null;
    }>({});
    const [techniqueData, setTechniqueData] = useState<{
        [key: string]: number | null;
    }>({});
    const courseList = filterCourseOfFaculty(clusterData);

    const dispatch = useAppDispatch();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const numberValue = parseInt(value.replace(/\D/g, ""));
        setFormData((prevData) => ({
            ...prevData,
            [name]: numberValue,
        }));
    };

    const handleEconomyChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        courseOfFaculty: string
    ) => {
        const { value } = e.target;
        const numberValue = parseInt(value.replace(/\D/g, ""));
        setEconomyData((prevData) => ({
            ...prevData,
            [courseOfFaculty]: numberValue,
        }));
    };

    const handleTechniqueChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        courseOfFaculty: string
    ) => {
        const { value } = e.target;
        const numberValue = parseInt(value.replace(/\D/g, ""));
        setTechniqueData((prevData) => ({
            ...prevData,
            [courseOfFaculty]: numberValue,
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

        dispatch(setBaseScholarshipPrice(baseScholarshipPrice));
        setOpen(false);
    };

    const handleApplyEconomy = () => {
        for (const key in clusterData) {
            const facultyParts = key.split(" - ");
            const facultyNameWithYear: string = facultyParts[0];
            const courseOfFaculty: string = `Khối Kinh Tế ${facultyNameWithYear}`;
            const courseOfFacultyTT: string = `Khối Kinh Tế TT ${facultyNameWithYear}`;

            const facultyNameWithoutYear = facultyParts.slice(1).join(" - ");
            const isEconomyGroup = economyGroup.some(
                (economy) =>
                    facultyNameWithoutYear
                        .toLowerCase()
                        .includes(economy.toLowerCase()) &&
                    economyGroup.some((economy) =>
                        key.toLowerCase().includes(economy.toLowerCase())
                    )
            );

            if (isEconomyGroup) {
                setFormData((prevData) => ({
                    ...prevData,
                    [key]: economyData[courseOfFaculty] as number,
                    [`${key}-TT`]: economyData[courseOfFacultyTT] as number,
                }));
            }
        }
    };

    const handleApplyTechnique = () => {
        for (const key in clusterData) {
            const facultyParts = key.split(" - ");
            const facultyNameWithYear: string = facultyParts[0];
            const courseOfFaculty: string = `Khối Kỹ Thuật ${facultyNameWithYear}`;
            const courseOfFacultyTT: string = `Khối Kỹ Thuật TT ${facultyNameWithYear}`;

            const facultyNameWithoutYear = facultyParts.slice(1).join(" - ");
            const isTechniqueGroup = techniqueGroup.some(
                (technique) =>
                    facultyNameWithoutYear
                        .toLowerCase()
                        .includes(technique.toLowerCase()) &&
                    techniqueGroup.some((technique) =>
                        key.toLowerCase().includes(technique.toLowerCase())
                    )
            );

            if (isTechniqueGroup) {
                setFormData((prevData) => ({
                    ...prevData,
                    [key]: techniqueData[courseOfFaculty] as number,
                    [`${key}-TT`]: techniqueData[courseOfFacultyTT] as number,
                }));
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <DialogHeader>
                <DialogTitle>Nhập Tiền Học Bổng Của Khoa và Khóa</DialogTitle>
                <DialogDescription>
                    Cột 1 cho hệ chính quy, Cột 2 cho hệ tiên tiến
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4 pr-2 max-h-96 overflow-y-auto">
                {courseList.map((course) => (
                    <div
                        className="grid grid-cols-12 items-center gap-4"
                        key={course}
                    >
                        <Label
                            htmlFor={`Khối Kinh Tế ${course}`}
                            className="text-left col-span-4 leading-normal"
                        >
                            {`Khối Kinh Tế ${course}`}
                        </Label>
                        <div className="col-span-4 relative">
                            <Input
                                type="text"
                                id={`Khối Kinh Tế ${course}`}
                                required
                                onChange={(e) =>
                                    handleEconomyChange(
                                        e,
                                        `Khối Kinh Tế ${course}`
                                    )
                                }
                                className="w-full pr-12"
                            />
                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                VND
                            </span>
                        </div>
                        <div className="col-span-4 relative">
                            <Input
                                type="text"
                                id={`Khối Kinh Tế TT ${course}`}
                                required
                                onChange={(e) =>
                                    handleEconomyChange(
                                        e,
                                        `Khối Kinh Tế TT ${course}`
                                    )
                                }
                                className="w-full pr-12"
                            />
                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                VND
                            </span>
                        </div>
                    </div>
                ))}
                {courseList.map((course) => (
                    <div
                        className="grid grid-cols-12 items-center gap-4"
                        key={course}
                    >
                        <Label
                            htmlFor={`Khối Kỹ Thuật ${course}`}
                            className="text-left col-span-4 leading-normal"
                        >
                            {`Khối Kỹ Thuật ${course}`}
                        </Label>
                        <div className="col-span-4 relative">
                            <Input
                                id={`Khối Kỹ Thuật ${course}`}
                                type="text"
                                required
                                onChange={(e) =>
                                    handleTechniqueChange(
                                        e,
                                        `Khối Kỹ Thuật ${course}`
                                    )
                                }
                                className="w-full pr-12"
                            />
                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                VND
                            </span>
                        </div>
                        <div className="col-span-4 relative">
                            <Input
                                id={`Khối Kỹ Thuật TT ${course}`}
                                type="text"
                                required
                                onChange={(e) =>
                                    handleTechniqueChange(
                                        e,
                                        `Khối Kỹ Thuật TT ${course}`
                                    )
                                }
                                className="w-full pr-12"
                            />
                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                VND
                            </span>
                        </div>
                    </div>
                ))}
                <div className="grid grid-cols-12 items-center gap-4">
                    <Button
                        variant="outline"
                        className="col-span-6"
                        type="button"
                        onClick={handleApplyEconomy}
                    >
                        Áp dụng cho khối Kinh Tế
                    </Button>
                    <Button
                        variant="outline"
                        className="col-span-6"
                        onClick={handleApplyTechnique}
                        type="button"
                    >
                        Áp dụng cho khối Kỹ Thuật
                    </Button>
                </div>
                {Object.keys(clusterData).map((key) => (
                    <div
                        className="grid grid-cols-12 items-center gap-4"
                        key={key}
                    >
                        <Label
                            htmlFor={key}
                            className="text-left col-span-4 leading-normal"
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
                                    formData[key] !== undefined
                                        ? formData[key]
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
                                    formData[`${key}-TT`] !== undefined
                                        ? formData[`${key}-TT`]
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
    );
}
