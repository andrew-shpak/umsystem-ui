import {AccessDenied} from "~/src/shared/pages";
import Layout from '~/src/layout';
import {uk} from "~/src/i18n";

const pageTitle = uk.accessDeniedPageTitle;

export function meta() {
    return [
        {title: pageTitle},
        {name: "description", content: pageTitle},
    ];
}

export const handle = {
    breadcrumb: () => <span>{pageTitle}</span>,
}
export default function AccessDeniedPage() {
    return (
        <Layout title={pageTitle}>
            <AccessDenied/>
        </Layout>
    )
}
