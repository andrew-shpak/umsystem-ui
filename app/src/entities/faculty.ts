import * as z from "zod";
import {uk} from "~/src/i18n";

const facultySchema = z.object({
    url: z.string().optional(),
    name: z.string({required_error: uk.requiredField}),
    shortName: z.string({required_error: uk.requiredField}),
    start: z.date({required_error: uk.requiredField}),
    end: z.date().optional(),
});
export type Faculty = z.infer<typeof facultySchema>;
export {
    facultySchema
};