import {format, formatISO, isAfter, isValid, parse} from "date-fns";


const dateFormat = "dd.MM.yyyy";

export const minDate = new Date(1940, 0, 1)
const getFormattedValue = (date: Date) =>
    format(date, dateFormat)
const parseDate = (date: string) => {
    return parse(date, dateFormat, new Date())
}
export const convertToISOString = (date: string) => {
    const parsedDate = parseDate(date)
    return isValid(parsedDate) ? formatISO(parsedDate) : ''

}
export const validateDateRange = (startDate: string, endDate?: string) => {
    if (!endDate) {
        return validateDate(startDate)
    }
    const parsedStartDate = parseDate(startDate)
    const parsedEndDate = parseDate(endDate)
    return isValid(parsedStartDate) && isValid(parsedEndDate) && isAfter(parsedEndDate, parsedStartDate)
}
export const validateDate = (date: string) => {
    const parsedDate = parseDate(date)
    console.log(parsedDate,isValid(parsedDate),isAfter(parsedDate, minDate),"parsedDate")
    return isValid(parsedDate) && isAfter(parsedDate, minDate)
}