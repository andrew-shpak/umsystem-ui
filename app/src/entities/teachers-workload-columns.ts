export default interface TeachersWorkloadColumn {
    url: string
    name: string
    coefficient: number
    index: number
    additional: boolean
    educationLevelId: string
    educationLevelName: string
    educationFormId: string
    educationFormName: string
    written: boolean
    verbal: boolean
    practical: boolean
    lecture: boolean
    laboratory: boolean
    exam: boolean
    module: boolean
    approved: boolean
    coursesIds: string[]
    consultation: boolean
    practice: boolean
    intermediateControl: boolean
    lessonTypeId: string
    coursePaper: boolean
}
