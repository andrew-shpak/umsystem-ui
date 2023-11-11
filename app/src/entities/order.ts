import * as z from "zod";
import {uk} from "../i18n";
import validator from "validator";
import * as phoneValidator from "phone";

const orderSchema = z.object({
    name: z.string({required_error: uk.requiredField}),
    lastName: z.string({required_error: uk.requiredField}),
    email: z.string({required_error: uk.requiredField})
        .email({message: uk.invalidEmail})
        .refine(validator.isEmail, uk.invalidEmail),
    phone: z.string({required_error: uk.requiredField})
        .refine((value) => phoneValidator.phone(value).isValid, uk.invalidPhone),
    message: z.string({required_error: uk.requiredField}),
    tariffId: z.string({required_error: uk.requiredField}),
});
export type Order = z.infer<typeof orderSchema>;
export {
    orderSchema
};