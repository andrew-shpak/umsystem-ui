import {redirect} from "@remix-run/node";
import {routes} from "~/src/constants";
import {environment} from "~/environment.server";
import {createServerClient, SupabaseClient} from "@supabase/auth-helpers-remix";

const validateResponseStatusCode = (request: Request, response: Response) => {
    if (response.status === 401) {
        return redirect(`${routes.signIn}?redirect=${request.url}`)
    }
    if (response.status === 403) {
        return redirect(routes.accessDenied)
    }
}
const getSupabaseSesion = async (supabaseClient: SupabaseClient) => {
    const {
        data: {session},
    } = await supabaseClient.auth.getSession()
    return session;
}
const getAccessToken = async (supabaseClient: SupabaseClient) => {
    const session = await getSupabaseSesion(supabaseClient)
    return session?.access_token
}
const getSupabaseClient = (request: Request, response: Response) => {
    return createServerClient(
        environment().SUPABASE_URL,
        environment().SUPABASE_ANON_KEY,
        {
            request,
            response,
        },
    )

}
export {
    validateResponseStatusCode,
    getSupabaseSesion,
    getAccessToken,
    getSupabaseClient
}