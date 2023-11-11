export interface Survey {
    course: string
    lessonType: string
    groups: string
    start: string
    end: string
    url: string
    studentsCount: number
    answersCount: number
    canPass: boolean
    teacher?: string

    commentsCount?: number
}
