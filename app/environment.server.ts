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

const environment = () => ({
    BASE_URL: 'https://dev.umsys.com.ua',
    CDN_URL: 'https://cdn.umsys.com.ua',
    USERS_SERVICE_BASE_URL: 'https://umsystem-users.azurewebsites.net',
    TARRIFS_SERVICE_BASE_URL: 'https://umsystem-tariffs.azurewebsites.net',
    EMAILS_SERVICE_BASE_URL: 'https://umsystem-emails.azurewebsites.net',
    ORGANIZATIONS_SERVICE_BASE_URL: 'https://umsystem-organizations.azurewebsites.net',
    GOOGLE_CLIENT_ID:'987722473204-v4ckcihtamuqlv4aa02voc8ioee0jfnl.apps.googleusercontent.com',
    GOOGLE_CLIENT_SECRET:'nMnxT3352vAhuzxSd1B5jgp0',
});
export {environment, environmentSchema}
