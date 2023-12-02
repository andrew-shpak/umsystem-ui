import type {LinksFunction, MetaFunction} from "@remix-run/node";
import {uk} from "~/src/i18n";
import styles from "../styles/landing.css";
import Layout from "~/src/layout";

const pageTitle = uk.mainPageTitle;
export const meta: MetaFunction = () => {
    return [
        {title: pageTitle},
        {name: "description", content: pageTitle},
    ];
};
export const links: LinksFunction = () => [
    {rel: "stylesheet", href: styles}
];
export default function Dashboard() {
    return (
        <Layout title={pageTitle}>
            Так має бути!!! Це не помилка!!!
        </Layout>
    );
}
