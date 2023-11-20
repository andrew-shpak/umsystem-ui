import * as z from "zod";
import {uk} from "~/src/i18n";
import {validateDate, validateDateRange} from "~/src/constants";


const educationSchema = z.object({
    url: z.string({}).optional(),
    start: z.string()
        .refine(validateDate, uk.invalidDate)
        .optional(),
    end: z.string()
        .refine(validateDate, uk.invalidDate)
        .optional(),
    educationFormId: z.string().optional(),
    financialSourceId: z.string().optional(),
    educationProgramId: z.string().optional(),
    educationLevelId: z.string().optional(),
});
export type Education = z.infer<typeof educationSchema>;
export {
    educationSchema
}