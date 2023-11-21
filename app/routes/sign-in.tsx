import type { LoaderFunction} from "@remix-run/node";
import { json } from "@remix-run/node";
import { environment } from "~/environment.server";
import { endpoints } from "~/src/constants";
import {SignInPage} from "~/src/shared/pages";

const pageTitle = 'Вхід у систему'

export function meta() {
    return [{title: pageTitle, description: 'Вхід у систему'}]
}

export const loader: LoaderFunction = async ({request}) => {
    const {headers} = request
    const url = new URL(request.url)
    const cookie = headers.get('cookie') as string
    const organizationRes = await fetch(
        `${environment().ORGANIZATIONS_SERVICE_BASE_URL}/${endpoints.organizations}/login/${url.host}`,
        {
            method: 'GET',
            headers: {Accept: 'application/json', cookie},
            credentials: 'include',
        },
    )
    const organization = await organizationRes.json()

    return json(
        {
            ...organization,
            host: url.host,
        },
        {
            headers,
        },
    )
}

export default function SignIn() {
    return (
        <SignInPage/>
    )
}
