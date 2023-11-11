import dayjs from "dayjs";

export const dateFormat="d.M.yyyy";
export const minDate = new Date(1940, 0, 1)
export const parseDate = (date: string) => {
    const parsedDate =  dayjs(date);
    return parsedDate.isValid() && parsedDate.isAfter(minDate)
}