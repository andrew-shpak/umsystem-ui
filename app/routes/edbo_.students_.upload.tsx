import type {LinksFunction} from "@remix-run/node";
import styles from "~/styles/layout.css";
import {useOutletContext} from "@remix-run/react";
import type {ContextType} from "~/src/shared/types";
import Layout from "~/src/layout";
import {UploadField} from "~/src/forms";

const pageTitle = 'Завантаження студентів з ЕДБО'
export const links: LinksFunction = () => [
    {rel: "stylesheet", href: styles},
];

export function meta() {
    return [
        {title: pageTitle},
        {name: "description", content: pageTitle},
    ];
}

export default function UploadEdboStudents() {
    const context = useOutletContext<ContextType>()
    return (
        <Layout title={pageTitle} {...context}>
            <UploadField/>
        </Layout>
    )
}