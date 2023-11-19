import * as z from "zod";
import {uk} from "~/src/i18n";
import {validateDate, validateDateRange} from "~/src/constants";

const financialSourceSchema = z.object({
    url: z.string({}),
    name: z.string({required_error: uk.requiredField}),
    start: z.string({required_error: uk.requiredField})
        .refine(validateDate, uk.invalidDate),
    end: z.string({required_error: uk.requiredField})
        .refine(validateDate, uk.invalidDate),
})
    .refine((entity) => validateDateRange(entity.start, entity.end), {
        message: uk.invalidDateRange,
        path: ["end"],
    });
export type FinancialSource = z.infer<typeof financialSourceSchema>;
export {
    financialSourceSchema
};