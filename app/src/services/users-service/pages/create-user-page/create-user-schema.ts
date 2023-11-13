import * as z from "zod";
import {uk} from "~/src/i18n";
import * as phoneValidator from "phone";
import validator from "validator";
<<<<<<< Updated upstream
import {validateDate} from "~/src/constants";
=======
import {parseDate} from "~/src/constants";
import {passportSchema} from "~/src/services/users-service/pages/create-user-page/passport-schema";
>>>>>>> Stashed changes

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
    .superRefine((data, ctx) => {
        console.log(data,"test")
        if(!data.identityNumber?.length && !data.passport?.number?.length && !data.studentId?.length) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ['identityNumber', 'passport.number',"studentId"],
                message: 'Введіть номер паспорту або ідентифікаційний номер або ID ФО',
            });
        }
    });
export type CreateUser = z.infer<typeof createUserSchema>;
export {
    createUserSchema
};