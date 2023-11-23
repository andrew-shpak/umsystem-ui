import type {LoaderFunction} from '@remix-run/node'
import {redirect} from '@remix-run/node'
import {createServerClient, parse, serialize} from '@supabase/ssr'
import {routes} from '~/src/constants'
import {environment} from "~/environment.server";

export const loader: LoaderFunction = async ({request}) => {
    const requestUrl = new URL(request.url)
    const code = requestUrl.searchParams.get('code')
    const redirectUrl = requestUrl.searchParams.get('next') ??
        requestUrl.searchParams.get('redirect') ?? routes.dashboard

    if (code) {
        const cookies = parse(request.headers.get('Cookie') ?? '')
        const headers = new Headers()

        const supabase = createServerClient(environment().SUPABASE_URL!, environment().SUPABASE_ANON_KEY!, {
            cookies: {
                get(key) {
                    return cookies[key]
                },
                set(key, value, options) {
                    headers.append('Set-Cookie', serialize(key, value, options))
                },
                remove(key, options) {
                    headers.append('Set-Cookie', serialize(key, '', options))
                },
            },
        })

        const {error} = await supabase.auth.exchangeCodeForSession(code)
        if (!error) {
            return redirect(redirectUrl ? redirectUrl : routes.dashboard, {headers})
        }
    }
}
