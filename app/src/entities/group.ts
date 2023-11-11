export default interface Group {
    url: string
    name: string
    educationProgramId: string
    educationProgramName: string
    educationFormId: string
    year: number
    // used in creating a new groups for course
    count: number
    parentId: string
    students: string[]
    selective: boolean
    courseId: string
    courseName: string
    studentsCount: number
    educationFormName: string
    approximateStudentsNumber: number
    academicYearId: string
    educationLevelName: string
    educationLevelId: string
    parentName: string
    teachersWorkloadCount: number
    createdByUserFullName: string
    semesterId: string
}
