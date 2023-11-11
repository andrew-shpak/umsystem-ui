import * as z from "zod";
import {uk} from "~/src/i18n";

const educationRecordSchema = z.object({
    url: z.string({}),
    name: z.string({required_error: uk.requiredField}),
    curriculumId: z.string().optional(),
    start: z.date({required_error: uk.requiredField}),
    end: z.date().optional(),
    educationFormId: z.string().optional(),
    financialSourceId: z.string().optional(),
    active: z.boolean().optional()
});
export type EducationRecord = z.infer<typeof educationRecordSchema>;
export {
    educationRecordSchema
};