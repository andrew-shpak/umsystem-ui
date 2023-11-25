import type {LinksFunction} from "@remix-run/node";
import {ActionFunction} from "@remix-run/node";
import styles from "~/styles/layout.css";
import {Form, useLocation} from "@remix-run/react";
import Layout from "~/src/layout";
import {SelectField, UploadField} from "~/src/forms";
import {conform, FormProvider, useForm} from "@conform-to/react";
import {getFieldsetConstraint, parse} from "@conform-to/zod";
import * as z from "zod";
import {endpoints, routes} from "~/src/constants";
import {Button} from "@nextui-org/react";
import {uk} from "~/src/i18n";
import * as React from "react";
import {environment} from "~/environment.server";
import {validateResponseStatusCode} from "~/helpers.server";
import {auth} from "~/auth.server";

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
    file: z.any(),
    // .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    // .refine(
    //     (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
    //     "Only .jpg, .jpeg, .png and .webp formats are supported."
    // )
    separator: z.string({required_error: uk.requiredField}),
    fileType: z.string({required_error: uk.requiredField}),
})

const separators = [
    {value: ',', label: 'Кома (,)'},
    {value: ';', label: 'Крапка з комою (;)'},
    {value: '\t', label: 'Табуляція (\\t)'},
    {value: '|', label: 'Палка (|)'},
    {value: ' ', label: 'Пробіл ( )'},
]
const edboFileTypes = [
    {value: 'students', label: 'Здобувачі'},
    {value: 'requests', label: 'Заяви абітурієнтів'},
]
export default function UploadEdboStudents() {
    const location = useLocation()
    const {form, fields, context} = useForm({
        defaultValue: {
            separator: separators[0].value,
            fileType: edboFileTypes[0].value,
        },
        constraint: getFieldsetConstraint(uploadEdboFileSchema),
        onValidate({formData}) {
            return parse(formData, {schema: uploadEdboFileSchema});
        },
        shouldValidate: "onBlur",
    });
    return (
        <Layout title={pageTitle}>
            <FormProvider context={context}>
                <Form
                    method="post"
                    {...conform.form(form)}
                    encType="multipart/form-data"
                    action={`${routes.edboStudents}/upload${location.search}`}
                    className="mb-10 mt-4 flex flex-col items-center justify-center gap-2"
                >
                    <SelectField
                        options={separators}
                        name={fields.separator.name}
                        formId={form.id}
                        label="Розділювач"
                        placeholder="Виберіть розділювач файлу"/>

                    <div className="my-4 w-full">
                        <UploadField
                            name={fields.file.name}
                            formId={form.id}

                            label="Виберіть файл у UTF-8 кодуванні" placeholder="Виберіть файл ЄДБО у UTF-8 кодуванні"/>
                    </div>

                    <SelectField options={edboFileTypes}
                                 name={fields.fileType.name}
                                 formId={form.id}
                                 label="Тип документу"
                                 placeholder="Виберіть тип ЄДБО документу"/>

                    <div className="w-full flex mt-4 justify-center">
                        <Button
                            type="submit"
                            variant="flat"
                            color='primary'
                            radius="sm"
                            className="w-full md:w-2/4"
                        >
                            {uk.upload}
                        </Button>
                    </div>
                </Form>
            </FormProvider>
        </Layout>
    )
}
export const action: ActionFunction = async ({request}) => {
    const formData = await request.formData();
    const {extraParams} = await auth.isAuthenticated(request, {
        failureRedirect: routes.signIn,
    });
    const response = await fetch(`${environment().USERS_SERVICE_BASE_URL}/${endpoints.students}/edbo/upload`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${extraParams.id_token} `,
        },
        body: formData,
    })

    const validationResult = validateResponseStatusCode(request, response);
    if (validationResult) return validationResult;

    return await response.json()
}