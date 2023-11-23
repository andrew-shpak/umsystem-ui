import * as z from "zod";
import {uk} from "~/src/i18n";
import {validateDate, validateDateRange} from "~/src/constants";

const educationRecordSchema = z.object({
    url: z.string({}),
    name: z.string({required_error: uk.requiredField}),
    curriculumId: z.string().optional(),
    start: z.string({required_error: uk.requiredField})
        .refine(validateDate, uk.invalidDate),
    end: z.string()
        .refine(validateDate, uk.invalidDate)
        .optional(),
    educationFormId: z.string().optional(),
    financialSourceId: z.string().optional(),
    active: z.boolean().optional()
}).refine((entity) => validateDateRange(entity.start, entity.end), {
    message: uk.invalidDateRange,
    path: ["end"],
});
export type EducationRecord = z.infer<typeof educationRecordSchema>;
export {
    educationRecordSchema
};