import dayjs from "dayjs";

export const dateFormat="d.M.yyyy";
export const minDate = new Date(1940, 0, 1)
export const validateDateRange = (startDate: string, endDate?: string) => {
    if (!endDate) {
        return validateDate(startDate)
    }
    const parsedStartDate = dayjs(startDate, dateFormat);
    const parsedEndDate = dayjs(endDate, dateFormat);
    return parsedStartDate.isValid() && parsedEndDate.isValid() && parsedStartDate.isBefore(parsedEndDate)
}
export const validateDate = (date: string) => {
    const parsedDate =  dayjs(date, dateFormat);
    return parsedDate.isValid() && parsedDate.isAfter(minDate)
}