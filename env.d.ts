/// <reference types="@remix-run/node" />
/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly NODE_ENV: string
    readonly VITE_SUPABASE_URL: string
    readonly VITE_SUPABASE_ANON_KEY: string
    readonly VITE_REDIRECT_URL: string
    readonly VITE_RATING_SERVICE_BASE_URL: string
    readonly VITE_SURVEY_SERVICE_BASE_URL: string
    readonly VITE_USERS_SERVICE_BASE_URL: string
    readonly VITE_PERMISSIONS_SERVICE_BASE_URL: string
    readonly VITE_NOTIFICATIONS_SERVICE_BASE_URL: string
    readonly VITE_TARRIFS_SERVICE_BASE_URL: string
    readonly VITE_EMAILS_SERVICE_BASE_URL: string
    readonly VITE_ORGANIZATIONS_SERVICE_BASE_URL: string
    readonly VITE_CV_SERVICE_BASE_URL: string
    readonly VITE_LESSONS_SERVICE_BASE_URL: string
    readonly VITE_CDN_BASE_URL: string
    readonly VITE_CDN_URL: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}