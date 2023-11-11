export default interface EducationCycle {
    name: string
    shortName: string
    url: string
    parentId: string
    parent: string
    number: number
    selective: boolean
    includeEducationsPrograms: boolean
    excludeEducationsPrograms: boolean
    ablative: string
    certification: boolean
    practical: boolean
}
