export interface TeacherWorkloadColumnEntry {
    url: string
    columns: Record<string, string | number | null>
    teacherWorkloadRecordId: string
    teacherId: string
    groups: string[]
    intermediateControl?: boolean
    teacherReplacementId?: string
}
