import * as z from "zod";
import {uk} from "~/src/i18n";

const financialSourceSchema = z.object({
    url: z.string({}),
    name: z.string({required_error: uk.requiredField}),
    start: z.date({required_error: uk.requiredField}),
    end: z.date({required_error: uk.requiredField}),
});
export type FinancialSource = z.infer<typeof financialSourceSchema>;
export {
    financialSourceSchema
};