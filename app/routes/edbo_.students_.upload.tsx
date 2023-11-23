import type {LinksFunction} from "@remix-run/node";
import styles from "~/styles/layout.css";
import {Form, useLocation, useOutletContext} from "@remix-run/react";
import type {ContextType} from "~/src/shared/types";
import Layout from "~/src/layout";
import {UploadField} from "~/src/forms";
import {useForm} from "@conform-to/react";
import {getFieldsetConstraint, parse} from "@conform-to/zod";
import * as z from "zod";
import {routes} from "~/src/constants";

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

const uploadEdboFileSchema = z.object({
    file: z.any()
    // .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    // .refine(
    //     (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
    //     "Only .jpg, .jpeg, .png and .webp formats are supported."
    // )
})
export default function UploadEdboStudents() {
    const context = useOutletContext<ContextType>()
    const location = useLocation()
    const [form, fields] = useForm({
        constraint: getFieldsetConstraint(uploadEdboFileSchema),
        onValidate({formData}) {
            return parse(formData, {schema: uploadEdboFileSchema});
        },
        shouldValidate: "onBlur",
    });
    return (
        <Layout title={pageTitle} {...context}>
            <Form
                method="post"
                {...form.props}
                action={`/edbo${routes.students}/upload${location.search}`}
                className="mb-10 mt-4 flex flex-col items-center justify-center gap-2"
            >
                <UploadField config={fields.file} label="Виберіть файл"/>
            </Form>
        </Layout>
    )
}