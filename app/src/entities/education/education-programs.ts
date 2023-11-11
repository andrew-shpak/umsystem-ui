import * as z from "zod";
import {uk} from "~/src/i18n";
//
// export default interface EducationProgram {
//   url: string
//   name: string
//   shortName: string
//   code: string
//   specialization: string
//   specialtyId: string
//   start: string
//   end: string | null
//   facultyId?: string
//   facultyName?: string
//   specialtyName?: string
//   educationLevelName?: string
//   educationLevelId?: string
//   students: number
//   users: string[]
//   trainingPeriod: string
//   abbreviation: string
// }
const educationProgramSchema = z.object({
    url: z.string({}),
    name: z.string({required_error: uk.requiredField}),
    shortName: z.string().optional(),
    specialtyId: z.string(),
    start: z.date({required_error: uk.requiredField}),
    end: z.date().optional(),
});
export type EducationProgram = z.infer<typeof educationProgramSchema>;
export {
    educationProgramSchema
};