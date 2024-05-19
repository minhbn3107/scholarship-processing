import { NextResponse } from "next/server";
import readExcel from "@/actions/readFile";

export const POST = async (req: Request) => {
    const formData = await req.formData();

    const file = formData.get("file") as File;

    if (!file) {
        return NextResponse.json(
            { error: "No files received." },
            { status: 400 }
        );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    try {
        const data = await readExcel(buffer, file.name);

        return NextResponse.json(data);
    } catch (error) {
        console.log("Error occurred ", error);
        return NextResponse.json({ Message: "Failed", status: 500 });
    }
};
