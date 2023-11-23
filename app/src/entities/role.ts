import * as z from "zod";
import {uk} from "~/src/i18n";

const roleSchema = z.object({
    url: z.string().optional(),
    name: z.string({required_error: uk.requiredField}),
    index: z.number({required_error: uk.requiredField})
        .positive()
        .min(1)
});
export type Role = z.infer<typeof roleSchema>;
export {
    roleSchema
};