import * as z from "zod";
import {uk} from "~/src/i18n";

const educationLevelSchema = z.object({
    url: z.string({}),
    name: z.string({required_error: uk.requiredField}),
    semesters: z.number({required_error: uk.requiredField}).positive({message: uk.positiveNumber})
        .int({message: uk.positiveNumber}),
    trainingPeriod: z.string({required_error: uk.requiredField}),
    abbreviation: z.string().optional(),
});
export type EducationLevel = z.infer<typeof educationLevelSchema>;
export {
    educationLevelSchema
};