import {questionsTypes} from '~/src/pages/survey-form'

export type SurveyTemplateSection = {
    id: string | number
    title: string
    description: string | null
    questions: {
        accessorKey?: string
        title: string
        description: string
        required: boolean
        choices?: string[]
        text?: string
        id: string
        questionType: (typeof questionsTypes)[number] | null
    }[]
}
