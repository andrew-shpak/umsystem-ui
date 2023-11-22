import type {LoaderFunction} from "@remix-run/node";
import {json} from "@remix-run/node";
import {environment} from "~/environment.server";
import {endpoints} from "~/src/constants";
import {SignIn} from "~/src/shared/pages";

const pageTitle = 'Вхід у систему'

export function meta() {
    return [
        {title: pageTitle},
        {name: "description", content: pageTitle},
    ];
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

export default function SignInPage() {
    return (
        <SignIn/>
    )
}
