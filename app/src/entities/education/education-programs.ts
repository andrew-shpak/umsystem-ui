import * as z from "zod";
import {uk} from "~/src/i18n";
import {validateDate, validateDateRange} from "~/src/constants";

const educationProgramSchema = z.object({
    url: z.string({}),
    name: z.string({required_error: uk.requiredField}),
    shortName: z.string().optional(),
    specialtyId: z.string(),
    start: z.string({required_error: uk.requiredField})
        .refine(validateDate, uk.invalidDate),
    end: z.string()
        .refine(validateDate, uk.invalidDate)
        .optional(),
}).refine((entity) => validateDateRange(entity.start, entity.end), {
    message: uk.invalidDateRange,
    path: ["end"],
});
export type EducationProgram = z.infer<typeof educationProgramSchema>;
export {
    educationProgramSchema
};