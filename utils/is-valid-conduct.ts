export default function isValidConduct(
    conduct: string,
    requiredConduct: string
): boolean {
    const conductOrder = ["Xuất sắc", "Tốt", "Khá"];
    const requiredConductIndex = conductOrder.indexOf(requiredConduct);
    const conductIndex = conductOrder.indexOf(conduct);

    return conductIndex === requiredConductIndex;
}
