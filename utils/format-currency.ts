export default function formatCurrency(value: number) {
    if (isNaN(value)) return "";
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
