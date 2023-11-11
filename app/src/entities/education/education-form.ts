import * as z from "zod";
import {uk} from "~/src/i18n";

const educationFormSchema = z.object({
    url: z.string({}),
    name: z.string({required_error: uk.requiredField}),
    users: z.array(z.string({})).optional(),
    abbreviation: z.string().optional(),
    ablative: z.string().optional(),
});
export type EducationForm = z.infer<typeof educationFormSchema>;
export {
    educationFormSchema
};