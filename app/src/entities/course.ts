import Curriculum from './curriculum'
import WorkingCurriculum from './working-curriculum'

export default interface Course {
    url: string
    code: string
    name: string
    shortName: string
    courseId: string
    start: string
    end: string | null
    approved: boolean
    selective: boolean
    additionalLesson: boolean
    educationalProcess: boolean
    scientificSpecialtyId: string
    scientificSpecialtyName: string
    scientificSpecialtyCode: string
    curriculumsRecordsCount: number
    workingCurriculumsRecordsCount: number
    selectiveCoursesCount: number
    curriculums: Curriculum[]
    workingCurriculums: WorkingCurriculum[]
    parent: string | null
    columnsIds: string[]
}
