export default interface SelectiveCourseOption {
    url: string
    educationPrograms: {
        educationProgramId: string
        educationFormId: string
        educationCycleId: string
        selected: string
        minAllowedUsersCount: number
        years: {
            value: string
            year: number
        }[]
        start: string
        end: string
        academicYearId: string
    }[]
    users: string[]
}
