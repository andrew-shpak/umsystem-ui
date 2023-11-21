import * as z from "zod";
import {uk} from "~/src/i18n";

const userFullNameSchema = z.object({
    url: z.string().optional(),
    name: z.string({required_error: uk.requiredField}),
    lastName: z.string({required_error: uk.requiredField}),
    middleName: z.string().optional(),
});
export type UserFullName = z.infer<typeof userFullNameSchema>;
export {
    userFullNameSchema
};