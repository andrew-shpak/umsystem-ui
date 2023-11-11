export default interface WorkingCurriculum {
    year: number
    url: string
    approved: boolean
    semesters: number
    educationLevelId: string
    educationLevelName: string
    educationFormId: string
    educationFormName: string
    educationProgramId: string
    educationProgramName: string
    comment: string
    departmentId: string
    users: string[]
    academicYearId: string
    curriculumId: string
    canMove: boolean
}
