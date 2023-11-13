import * as z from "zod";
import {uk} from "~/src/i18n";
import * as phoneValidator from "phone";
import validator from "validator";
import {passportSchema} from "~/src/services/users-service/pages/create-user-page/passport-schema";
import {validateDate} from "~/src/constants";

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
        .refine(validateDate, uk.invalidDate)
        .optional(),
    studentId: z.string().optional(),
    identityNumber: z.string().optional(),
    passport: z.object(passportSchema.shape).optional(),
})
    .superRefine((entity, ctx) => {
        const {studentId, identityNumber, passport} = entity;
        const message = "Введіть інформацію про ІНП або паспорт або ID ФО";
        if (!studentId?.length && !identityNumber?.length && !passport?.number?.length) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ['identityNumber'],
                message
            });
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ['studentId'],
                message,
            });
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ['passport', 'number'],
                message,
            });
        }
    });
export type CreateUser = z.infer<typeof createUserSchema>;
export {
    createUserSchema
};