import * as z from 'zod'

const environmentSchema = z.object({
    NODE_ENV: z
        .enum(['development', 'production', 'test'])
        .default('development'),
    BASE_URL: z.string().url(),
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
    COOKIE_SECRET: z.string(),
    AUTH_COOKIE_NAME: z.string(),
    // REDIRECT_URL: z.string().url(),
    // RATING_SERVICE_BASE_URL: z.string().url(),
    // SURVEY_SERVICE_BASE_URL: z.string().url(),
    USERS_SERVICE_BASE_URL: z.string().url(),
    // PERMISSIONS_SERVICE_BASE_URL: z.string().url(),
    // NOTIFICATIONS_SERVICE_BASE_URL: z.string().url(),
    TARRIFS_SERVICE_BASE_URL: z.string().url(),
    EMAILS_SERVICE_BASE_URL: z.string().url(),
    ORGANIZATIONS_SERVICE_BASE_URL: z.string().url(),
    // CV_SERVICE_BASE_URL: z.string().url(),
    // LESSONS_SERVICE_BASE_URL: z.string().url(),
    // CDN_BASE_URL: z.string().url(),
    CDN_URL: z.string().url(),
})

const environment = () => environmentSchema.parse(process.env)
export {environment, environmentSchema}
