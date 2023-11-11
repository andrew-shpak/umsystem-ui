import * as z from "zod";
import {uk} from "~/src/i18n";

const tariffSchema = z.object({
    id: z.string().optional(),
    url: z.string().optional(),
    name: z.string({required_error: uk.requiredField}),
    price: z.number({required_error: uk.requiredField}).positive(),
    description: z.string({required_error: uk.requiredField}),
});
export type Tariff = z.infer<typeof tariffSchema>;
export {
    tariffSchema
};