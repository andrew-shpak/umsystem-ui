import {useLoaderData, useOutletContext} from "@remix-run/react"
import type {Tariff} from "~/src/entities";
import type {ContextType} from "~/src/shared/types";
import Layout from "~/src/layout";
import {endpoints, routes} from "~/src/constants";
import styles from "../styles/layout.css";
import type {LinksFunction, LoaderFunction} from "@remix-run/node";
import {redirect} from "@remix-run/node";
import {environment} from "~/environment.server";
import {DataGrid} from "~/src/data-grid";
import {tariffsColumns} from "~/src/columns";

const pageTitle = 'Створення користувача'
export const links: LinksFunction = () => [
    { rel: "stylesheet", href: styles }
];
export function meta() {
    return [
        {
            title: pageTitle,
            description: 'Створення користувача організації',
        },
    ]
}

export const loader: LoaderFunction = async ({request}) => {
    const {headers} = request
    const cookie = headers.get('cookie') as string
    const res = await fetch(
        `${environment().TARRIFS_SERVICE_BASE_URL}/${endpoints.tariffs}`,
        {
            headers: {
                Accept: 'application/json',
                cookie,
            },
            credentials: 'include',
        },
    )
    if (res.status === 401) {
        return redirect(`${routes.signIn}?redirect=${request.url}`)
    }
    if (res.status === 403) {
        return redirect(routes.accessDenied)
    }
    return await res.json()
}
export const handle = {
    breadcrumb: () => <span>{pageTitle}</span>,
}

type LoaderData = {
    tariffs: Tariff[]
}
// eslint-disable-next-line complexity
export default function CreateNewUserPage() {
    const context = useOutletContext<ContextType>()
    const response = useLoaderData<LoaderData>()
    return (
        <Layout title={pageTitle} {...context}>
            <DataGrid rows={response.tariffs} columns={tariffsColumns}/>
        </Layout>
    )
}
