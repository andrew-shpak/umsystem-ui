import type {LoaderFunction} from '@remix-run/node'
import {redirect} from '@remix-run/node'
import {createServerClient} from '@supabase/auth-helpers-remix'
import {environment} from '~/environment.server'
import {routes} from '~/src/constants'

export const loader: LoaderFunction = async ({request}) => {
    const response = new Response()
    const url = new URL(request.url)
    const code = url.searchParams.get('code')
    const redirectUrl = url.searchParams.get('redirect')
    if (code) {
        const supabaseClient = createServerClient(
            environment().SUPABASE_URL,
            environment().SUPABASE_ANON_KEY,
            {request, response},
        )
        await supabaseClient.auth.exchangeCodeForSession(code)
    }

    return redirect(redirectUrl ? redirectUrl : routes.dashboard, {
        headers: response.headers,
    })
}
