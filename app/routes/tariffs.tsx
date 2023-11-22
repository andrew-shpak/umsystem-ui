import {useLoaderData, useOutletContext} from "@remix-run/react"
import type {Tariff} from "~/src/entities";
import type {ContextType} from "~/src/shared/types";
import Layout from "~/src/layout";
import {endpoints} from "~/src/constants";
import styles from "../styles/layout.css";
import type {LinksFunction, LoaderFunction} from "@remix-run/node";
import {environment} from "~/environment.server";
import {DataGrid} from "~/src/data-grid";
import {tariffsColumns} from "~/src/columns";
import {validateResponseStatusCode} from "~/helpers.server";

const pageTitle = 'Створення студента'
export const links: LinksFunction = () => [
    {rel: "stylesheet", href: styles}
];

export function meta() {
    return [
        {title: pageTitle},
        {name: "description", content: 'Створення студента'},
    ];
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
    const validationResult = validateResponseStatusCode(request, res);
    if (validationResult) return validationResult;

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
