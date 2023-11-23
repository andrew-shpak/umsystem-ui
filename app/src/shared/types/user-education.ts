import type {EducationRecord} from "~/src/entities";

type UserEducation = EducationRecord & {
    educationProgram: string
    educationLevel: string
    educationForm: string
    financialSource: string
    year: string
    start: string
    end: string
    curriculum: string
}
export type {UserEducation}