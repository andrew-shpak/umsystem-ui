import * as z from "zod";
import {uk} from "~/src/i18n";
import * as phoneValidator from "phone";
import validator from "validator";
import {validateDate, validateDateRange} from "~/src/constants";
import { educationSchema } from "./education-schema";
import { passportSchema } from "./passport-schema";

const createUserSchema = z.object({
    name: z.string({required_error: uk.requiredField}),
    lastName: z.string({required_error: uk.requiredField}),
    middleName: z.string().optional(),
    recoveryEmail: z.string().email({message: uk.invalidEmail})
        .refine(validator.isEmail, uk.invalidEmail).optional(),
    recoveryPhone: z.string({required_error: uk.requiredField})
        .refine((value) => phoneValidator.phone(value).isValid, uk.invalidPhone),
    birthday: z.string()
        .refine(validateDate, uk.invalidDate)
        .optional(),
    studentId: z.string().optional(),
    identityNumber: z.string().optional(),
    passport: z.object(passportSchema.shape).optional(),
    education: z.object(educationSchema.shape).optional(),
    roleId: z.string().optional(),
    password: z.string().optional(),
    generatePassword: z.boolean().optional(),
    validation: z.boolean().default(true).optional(),
    action: z
        .enum(['save', 'validate'])
        .default('validate')
        .optional(),
})
    .superRefine((entity, ctx) => {
        const {studentId, identityNumber, passport,education} = entity;
        if (education &&!validateDateRange(education.start, education.end)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ['education', 'end'],
                message: uk.invalidDateRange
            });
        }
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