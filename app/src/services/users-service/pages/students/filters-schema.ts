import * as z from "zod";
import {validateDate, validateDateRange} from "~/src/constants";
import {uk} from "~/src/i18n";

const studentsFiltersSchema = z.object({
    educationProgramId: z.string().optional(),
    year: z.number()
        .positive()
        .min(1)
        .max(5)
        .optional(),
    start: z.string()
        .refine(validateDate, uk.invalidDate)
        .optional(),
    end: z.string()
        .refine(validateDate, uk.invalidDate)
        .optional(),
    educationFormId: z.string().optional(),
    educationLevelId: z.string().optional(),
    financialSourceId: z.string().optional(),
    deleted: z.boolean().optional(),
    userId: z.string().optional(),
    fullName: z.string().optional(),
}).refine((entity) => validateDateRange(entity.start, entity.end), {
    message: uk.invalidDateRange,
    path: ["end"],
});
export type StudentsPageFilters = z.infer<typeof studentsFiltersSchema>;
export {
    studentsFiltersSchema
};