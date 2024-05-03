import { conductOrder } from "@/utils/raking-variable";

export default function isValidConduct(
    conduct: string,
    requiredConduct: string
): boolean {
    const requiredConductIndex = conductOrder.indexOf(requiredConduct);
    const conductIndex = conductOrder.indexOf(conduct);

    return conductIndex === requiredConductIndex;
}
