import * as z from "zod";
import {uk} from "~/src/i18n";
import {validateDate} from "~/src/constants";

const passportSchema = z.object({
    type: z.string().optional(),
    series: z.string().optional(),
    number: z.string().optional(),
    issuedBy: z.string().optional(),
    issuedDate: z.string()
        .refine(validateDate, uk.invalidDate)
        .optional(),
    validUntil: z.string()
        .refine(validateDate, uk.invalidDate)
        .optional(),

});
export type Passport = z.infer<typeof passportSchema>;
export {
    passportSchema
};