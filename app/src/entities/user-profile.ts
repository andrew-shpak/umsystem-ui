export default interface UserProfile {
    organization: {
        name: string
        shortName: string
    }
    user: {
        hasRoles: boolean
        primaryEmail: string
        userFullName: string
        avatar: string
        unknownUser: boolean
        isAdmin: boolean
        canSwitch: boolean
    }
}
