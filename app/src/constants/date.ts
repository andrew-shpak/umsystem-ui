import {format, formatISO, isAfter, isValid, parse} from "date-fns";


const dateFormat = "dd.MM.yyyy";

export const minDate = new Date(1940, 0, 1)
export const formatValue = (date: string, pattern = dateFormat) =>
    format(new Date(date), pattern)
const parseDate = (date: string) => {
    return parse(date, dateFormat, new Date())
}
export const convertToISOString = (date: string) => {
    const parsedDate = parseDate(date)
    return isValid(parsedDate) ? formatISO(parsedDate) : ''

}
export const validateDateRange = (startDate?: string, endDate?: string) => {
    if (!startDate) {
        return true;
    }
    if (!endDate) {
        return validateDate(startDate)
    }
    const parsedStartDate = parseDate(startDate)
    const parsedEndDate = parseDate(endDate)
    return isValid(parsedStartDate) && isValid(parsedEndDate) && isAfter(parsedEndDate, parsedStartDate)
}
export const validateDate = (date: string) => {
    const parsedDate = parseDate(date)
    return isValid(parsedDate) && isAfter(parsedDate, minDate)
}