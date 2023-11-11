import type EducationRecord from '~/src/entities/education/education-record'

export default interface User {
    url: string
    userFullName: string
    primaryEmail: string
    recoveryEmail: string
    recoveryPhone: string
    fullName: {
        name: string
        email: string
        userFullName: string
        lastName: string
        middleName: string
        alias: boolean
        created: string
    }[]
    birthday: string
    passport?: {
        number: string
        series: string
        issuedBy: string
        issuedDate: string
        validUntil: string
    }
    education?: EducationRecord
    avatar: string
    showInCv: boolean
    deleted: boolean
}

