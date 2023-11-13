import * as z from "zod";
import {uk} from "~/src/i18n";
import {validateDate, validateDateRange} from "~/src/constants";

const facultySchema = z.object({
    url: z.string().optional(),
    name: z.string({required_error: uk.requiredField}),
    shortName: z.string({required_error: uk.requiredField}),
    start: z.string({required_error: uk.requiredField}).refine(validateDate, uk.invalidDate),
    end: z.string().optional(),
}).refine((entity) => validateDateRange(entity.start, entity.end), {
    message: "Дата закінчення повинна бути пізнішою за дату початку",
    path: ["endDate"],
});
export type Faculty = z.infer<typeof facultySchema>;
export {
    facultySchema
};