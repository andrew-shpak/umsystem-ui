import * as z from "zod";
import {uk} from "~/src/i18n";
import {parseDate} from "~/src/constants";

const passportSchema = z.object({
    type: z.string().optional(),
    series: z.string().optional(),
    number: z.string().optional(),
    issuedBy: z.string().optional(),
    issuedDate: z.string()
        .refine(parseDate, uk.invalidDate)
        .optional(),
    validUntil: z.string()
        .refine(parseDate, uk.invalidDate)
        .optional(),

});
export type Passport = z.infer<typeof passportSchema>;
export {
    passportSchema
};