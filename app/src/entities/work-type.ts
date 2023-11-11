export default interface WorkType {
    url: string
    title: string
    example: string
    description: string
    comment: string
    hoursLimit: number | null
    categoryId: string
    includeInCv: boolean
    includeInRating: boolean
    includeInReport: boolean
    active: boolean
    count: number
    canDelete: boolean
    titleWithCategory: string
    start: string
    end: string
}
