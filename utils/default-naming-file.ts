export function defaultNamingFile() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    const beforeYear = currentYear - 1;

    if (currentMonth <= 5) {
        return `Danh Sách Học bổng HK1(${beforeYear}-${currentYear})`;
    } else {
        return `Danh Sách Học bổng HK2(${beforeYear}-${currentYear})`;
    }
}
