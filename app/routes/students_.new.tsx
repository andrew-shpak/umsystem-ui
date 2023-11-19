import {
    Form,
    Link,
    useActionData,
    useLocation,
    useNavigation,
    useOutletContext,
    useSearchParams
} from "@remix-run/react"
import {useFieldset, useForm} from "@conform-to/react";
import type {ContextType} from "~/src/shared/types";
import Layout from "~/src/layout";
import {getFieldsetConstraint, parse} from "@conform-to/zod";
import {endpoints, routes} from "~/src/constants";
import {
    createUserSchema,
    DuplicatesSection,
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
import {json, redirect} from "@remix-run/node";
import {uk} from "~/src/i18n";
import {environment} from "~/environment.server";

const pageTitle = 'Створення користувача'
export const links: LinksFunction = () => [
    {rel: "stylesheet", href: styles}
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
    const url = new URL(request.url)
    const res = await fetch(
        `${environment().USERS_SERVICE_BASE_URL}/${endpoints.students}/data${url.search}`,
        {
            headers: {
                Accept: 'application/json',
                cookie,
            },
            credentials: 'include',
        },
    )
    // if (res.status === 401) {
    //     return redirect(`${routes.signIn}?redirect=${request.url}`)
    // }
    // if (res.status === 403) {
    //     return redirect(routes.accessDenied)
    // }
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
    const context = useOutletContext<ContextType>()
    const [searchParams] = useSearchParams()
    const actionData = useActionData<typeof action>()
    // const canDisableUserValidation = context.permissions.includes(
    //   DISABLE_USERS_VALIDATION,
    // )
    // const canSelectUserOrganization = context.permissions.includes(
    //   SELECT_USER_ORGANIZATION,
    // )
    const location = useLocation()
    const [form, fields] = useForm({
        defaultValue: {
            validate: true,
            ...Object.fromEntries(searchParams),
        },
        constraint: getFieldsetConstraint(createUserSchema),
        onValidate({formData}) {
            return parse(formData, {schema: createUserSchema});
        },
        shouldValidate: "onBlur",
    });
    const passportFields = useFieldset(form.ref, fields.passport);
    const navigation = useNavigation();
    return (
        <Layout title="Створення нового користувача" {...context}>
            <Form
                method="post"
                {...form.props}
                action={`${routes.students}/new${location.search}`}
                className="mb-10 mt-4 flex flex-col items-center justify-center gap-2"
            >
                <div className="md:grid md:grid-cols-2 md:gap-7 w-full">
                    <FullNameSection fields={fields}/>
                    <GeneralInformationSection fields={fields}/>
                    <PassportSection fields={passportFields}/>
                    <RoleSection fields={fields}/>
                    <PasswordSection fields={fields}/>
                    <ValidationSection fields={fields}/>
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
        </Layout>
    )
}
export const action: ActionFunction = async ({request}) => {
    const {headers} = request
    const cookie = headers.get('cookie') as string
    const formData = await request.formData();
    const submission = parse(formData, {schema: createUserSchema});
    const url = `${environment().USERS_SERVICE_BASE_URL}/${endpoints.students}/validation`
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
    if (response.status === 401) {
        return redirect(`${routes.signIn}?redirect=${request.url}`)
    }
    return await response.json()
}