import type {LoaderFunction} from "@remix-run/node";
import {json} from "@remix-run/node";
import {environment} from "~/environment.server";
import {endpoints, routes} from "~/src/constants";
import {SignIn} from "~/src/shared/pages";
import {auth} from "~/auth.server";
import {validateResponseStatusCode} from "~/helpers.server";

const pageTitle = 'Вхід у систему'

export function meta() {
    return [
        {title: pageTitle},
        {name: "description", content: pageTitle},
    ];
}

export const loader: LoaderFunction = async ({request}) => {
    const {extraParams} = await auth.isAuthenticated(request, {
        failureRedirect: routes.signIn,
    });
    const {headers} = request
    const url = new URL(request.url)
    const response = await fetch(
        `${environment().ORGANIZATIONS_SERVICE_BASE_URL}/${endpoints.organizations}/login/${url.host}`,
        {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${extraParams.id_token} `,
            },
        },
    )
    const validationResult = validateResponseStatusCode(request, response);
    if (validationResult) return validationResult;

    const organization = await response.json()

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
