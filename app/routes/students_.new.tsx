import {Form, Link, useActionData, useLocation, useNavigation} from "@remix-run/react"
import {conform, FormProvider, useForm} from "@conform-to/react";
import Layout from "~/src/layout";
import {getFieldsetConstraint, parse} from "@conform-to/zod";
import {endpoints, routes} from "~/src/constants";
import {
    createUserSchema,
    DuplicatesSection,
    EducationSection,
    FullNameSection,
    GeneralInformationSection,
    PassportSection,
    PasswordSection,
    RoleSection,
    ValidationSection
} from "~/src/services/users-service/pages/create-user-page";
import styles from "../styles/layout.css";
import {Button, Spinner} from "@nextui-org/react";
import type {ActionFunction, LinksFunction, LoaderFunction} from "@remix-run/node";
import {json} from "@remix-run/node";
import {uk} from "~/src/i18n";
import {environment} from "~/environment.server";
import {validateResponseStatusCode} from "~/helpers.server";
import {auth} from "~/auth.server";

const pageTitle = 'Створення користувача'
export const links: LinksFunction = () => [
    {rel: "stylesheet", href: styles}
];

export function meta() {
    return [
        {title: pageTitle},
        {name: "description", content: 'Створення користувача організації'},
    ];
}

export const loader: LoaderFunction = async ({request}) => {
    const {extraParams} = await auth.isAuthenticated(request, {
        failureRedirect: routes.signIn,
    });
    const url = new URL(request.url)
    const res = await fetch(
        `${environment().USERS_SERVICE_BASE_URL}/${endpoints.students}/data${url.search}`,
        {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${extraParams.id_token} `,
            },
        },
    )

    const validationResult = validateResponseStatusCode(request, res);
    if (validationResult) return validationResult;

    const response = await res.json();

    return json({
        ...response,
        cdnUrl: environment().CDN_URL,
    })
}
export const handle = {
    breadcrumb: () => <span>{pageTitle}</span>,
}
export default function CreateNewUserPage() {
    const actionData = useActionData<typeof action>()
    // const canDisableUserValidation = context.permissions.includes(
    //   DISABLE_USERS_VALIDATION,
    // )
    // const canSelectUserOrganization = context.permissions.includes(
    //   SELECT_USER_ORGANIZATION,
    // )
    const location = useLocation()
    const {form, fields, context} = useForm({
        defaultValue: {
            validation: true,
        },
        constraint: getFieldsetConstraint(createUserSchema),
        onValidate({formData}) {
            return parse(formData, {schema: createUserSchema});
        },
        shouldValidate: "onBlur",
    });

    const navigation = useNavigation();
    return (
        <Layout title="Створення нового користувача">
            <FormProvider context={context}>
                <Form
                    method="post"
                    {...conform.form(form)}
                    action={`${routes.students}/new${location.search}`}
                    className="mb-10 mt-4 flex flex-col items-center justify-center gap-2"
                >
                    <div className="md:grid md:grid-cols-2 md:gap-7 w-full">
                        <FullNameSection fields={fields} formId={form.id}/>
                        <GeneralInformationSection fields={fields} formId={form.id}/>
                        <EducationSection name={fields.education.name} formId={form.id}/>
                        <PassportSection name={fields.passport.name} formId={form.id}/>
                        <RoleSection fields={fields} formId={form.id}/>
                        <PasswordSection fields={fields} formId={form.id}/>
                        <ValidationSection fields={fields} formId={form.id}/>
                    </div>

                    <Spinner label="Перевірка на збіги" className={navigation.state === "idle" ? "hidden" : ""}/>

                    <DuplicatesSection/>

                    <div
                        className={`w-full text-center text-2xl font-semibold  ${actionData?.students || !actionData ? "hidden" : "block"}`}>
                        Валідація пройшла успішно - збігів не знайдено
                    </div>
                    <div className="flex w-full mt-7 md:flex-row flex-col items-center justify-center gap-4">
                        <Button
                            as={Link}
                            to={`${routes.users}${location.search}`}
                            prefetch="intent"
                            color="danger"
                            variant="flat"
                            radius="sm"
                            className="md:w-1/4"
                            fullWidth
                        >
                            {uk.close}
                        </Button>
                        <Button
                            type="submit"
                            className="md:w-1/4"
                            name="action"
                            color="primary"
                            variant="flat"
                            radius="sm"
                            value="validate"
                            fullWidth
                        >
                            {uk.validate}
                        </Button>
                        <Button
                            type="submit"
                            value="save"
                            name="action"
                            variant="flat"
                            radius="sm"
                            color={"success"}
                            className={"md:w-1/4"}
                            fullWidth
                            isDisabled={!actionData}
                        >
                            {uk.save}
                        </Button>
                    </div>
                </Form>
            </FormProvider>
        </Layout>
    )
}
export const action: ActionFunction = async ({request}) => {
    const {headers} = request
    const cookie = headers.get('cookie') as string
    const formData = await request.formData();
    const submission = parse(formData, {schema: createUserSchema});

    if (submission.value?.education && !submission.value?.education?.educationProgramId) {
        delete submission.value.education
    }

    if (submission.value?.passport && !submission.value?.passport?.number) {
        delete submission.value.passport
    }

    const url = submission.value?.action === "validate"
        ? `${environment().USERS_SERVICE_BASE_URL}/${endpoints.students}/validation`
        : `${environment().USERS_SERVICE_BASE_URL}/${endpoints.users}`
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            cookie,
        },
        credentials: 'include',
        body: JSON.stringify(submission.value),
    })

    const validationResult = validateResponseStatusCode(request, response);
    if (validationResult) return validationResult;

    return await response.json()
}