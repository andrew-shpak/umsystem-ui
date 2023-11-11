export default interface SelectiveCourse {
    studentsCount: number
    url: string
    courseId: string
    teacherId: string
    educationCycleId: string
    educationPrograms: string[]
    excludeEducationPrograms: string[]
    prerequisitesForStudy: string
    educationResults: string
    courseName: string
    courseCode: string
    academicYearId: string
    maxStudents: number
    minStudents: number
    creditsNumber: number
    validateSemester: boolean
    description: string
    results: string
    code: string
    status: string
    skip: boolean
    initial: boolean
    close: boolean
    showUsers: boolean
    module: boolean
    exam: boolean
    rejected: boolean
    semesters: {
        educationLevelId: string
        semester: number
        value: string
    }[]
    students: Record<
        number,
        {
            url: string
            semester: number
            educationProgramId: string
            educationProgramName: string
            educationFormId: string
            educationFormName: string
            email: string
            fullName: string
        }[]
    >
    educationForms: Record<
        string,
        {
            url: string
            lecture: string
            practical: string
            laboratory: string
        } | null
    >
    departmentId: string
}
