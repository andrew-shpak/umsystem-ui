export default interface Curriculum {
    start: string
    end: string
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
    active: boolean
    qualification: string
    canDelete: boolean
    canMove: boolean
}
