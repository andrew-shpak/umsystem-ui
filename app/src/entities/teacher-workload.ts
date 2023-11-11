export default interface TeacherWorkloadRecord {
    url: string
    module: boolean
    exam: boolean
    studentsNumber: number
    practical: number
    lecture: number
    laboratory: number
    coursePaper: boolean
    consultation: number
    creditsNumber: number
    semester: number
    teacherFullName: string
    approved: boolean
    modifiedOn: string
    course: string
    courseId: string
    teacherId: string
    groups: string
    columns: Record<string, string | number | null>
    total: number
    departmentId: string
    groupId: string | null
    year: number
    educationPrograms: string
    educationProgramId: string
    intermediateControl: boolean
    educationFormId: string
    academicYearId: string
    primary: boolean
    educationProgram: string
    recordsIds?: string[]
    canDelete: boolean
}
