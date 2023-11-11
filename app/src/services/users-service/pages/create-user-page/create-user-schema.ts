import * as z from "zod";
import {uk} from "~/src/i18n";
import * as phoneValidator from "phone";
import validator from "validator";
import {parseDate} from "~/src/constants";

const createUserSchema = z.object({
    name: z.string({required_error: uk.requiredField}),
    lastName: z.string({required_error: uk.requiredField}),
    middleName: z.string().optional(),
    recoveryEmail: z.string().email({message: uk.invalidEmail})
        .refine(validator.isEmail, uk.invalidEmail).optional(),
    recoveryPhone: z.string()
        .refine((value) => phoneValidator.phone(value).isValid, uk.invalidPhone)
        .optional(),
    birthday: z.string()
        .refine(parseDate, uk.invalidDate)
        .optional(),
    studentId: z.string().optional(),
    identityNumber: z.string().optional(),
});
export type CreateUser = z.infer<typeof createUserSchema>;
export {
    createUserSchema
};