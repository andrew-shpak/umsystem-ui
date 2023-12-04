import {Form, useLoaderData, useNavigation, useSearchParams} from "@remix-run/react"
import Layout from "~/src/layout";
import {Avatar, Button, Card, CardBody, CardFooter, CardHeader, Divider, Pagination, Spinner} from "@nextui-org/react";
import *as  React from "react";
import {conform, FormProvider, useForm} from "@conform-to/react";
import {getFieldsetConstraint, parse} from "@conform-to/zod";
import type {EducationForm, EducationLevel, EducationProgram, User,} from "~/src/entities";
import type { LoaderFunction} from "@remix-run/node";
import {json} from "@remix-run/node";
import {environment} from "~/environment.server";
import {endpoints, routes} from "~/src/constants";
import {FiltersForm} from "~/src/services/users-service/pages";
import {studentsFiltersSchema} from "~/src/services/users-service/pages/students";
import {uk} from "~/src/i18n";
import {cn} from "~/src/shared/utils";
import {auth} from "~/auth.server";
import {validateResponseStatusCode} from "~/helpers.server";

const pageTitle = 'Список студентів'


export function meta() {
    return [
        {title: pageTitle},
        {name: "description", content: pageTitle},
    ];
}

export const loader: LoaderFunction = async ({request}) => {
    const url = new URL(request.url)
    const {extraParams} = await auth.isAuthenticated(request, {
        failureRedirect: routes.signIn,
    });
    const res = await fetch(
        `${environment().USERS_SERVICE_BASE_URL}/${endpoints.students}${url.search}`,
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
type LoaderData = {
    educationPrograms: EducationProgram[]
    educationForms: EducationForm[]
    educationLevels: EducationLevel[]
    users: User[]
    students: User[]
    cdnUrl: string
}
export default function CreateNewUserPage() {
    const response = useLoaderData<LoaderData>();
    const [searchParams] = useSearchParams()
    const {form, fields, context} = useForm({
        defaultValue: {
            ...Object.fromEntries(searchParams)
        },
        constraint: getFieldsetConstraint(studentsFiltersSchema),
        onValidate({formData}) {
            return parse(formData, {schema: studentsFiltersSchema});
        },
        shouldValidate: "onBlur",
    });
    const [currentPage, setCurrentPage] = React.useState(1);
    const rowsPerPage = 12;
    const pages = Math.ceil(response.students.length / rowsPerPage);
    const onNextPage = React.useCallback(() => {
        if (currentPage < pages) {
            setCurrentPage(currentPage + 1);
        }
    }, [currentPage, pages]);

    const onPreviousPage = React.useCallback(() => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }, [currentPage]);
    const navigation = useNavigation();
    return (
        <Layout title={pageTitle}>
            <FormProvider context={context}>
                <Form
                    {...conform.form(form)}
                    method="get"
                    className="gap-2"
                >
                    <div className="w-full flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 items-center">
                        <FiltersForm fields={fields} formId={form.id}/>
                        <Button
                            type="submit"
                            variant="flat"
                            color='primary'
                            radius="sm"
                        >
                            {uk.search}
                        </Button>
                    </div>
                </Form>
            </FormProvider>
            <div
                className={cn("flex justify-center my-4", {
                    "hidden": navigation.state === "idle"
                })}>
                <Spinner label="Завантаження списку користувачів"/>
            </div>
            {response.students.length === 0 && searchParams.size != 0 && navigation.state === "idle" ? <div>
                <h1 className="text-center text-2xl font-semibold mt-4">Записів не знайдено</h1>
            </div> : null}
            <div className={cn("grid lg:grid-cols-3 md:grid-cols-2 gap-4 mt-4", {
                "hidden": response.students.length === 0
            })}>
                {response.students
                    .sort((a, b) => a.userFullName.localeCompare(b.userFullName))
                    .slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
                    .map((user: User) => {
                        return (
                            <Card className="max-w-[450px]" key={user.url}>
                                <CardHeader className="justify-between">
                                    <div className="flex gap-5">
                                        <Avatar isBordered
                                                radius="full"
                                                color="warning"
                                                size="md"
                                                src={user.avatar ? `${response.cdnUrl}/avatars/${user.avatar}` : undefined}
                                                name={user.userFullName.substring(0, 1)}/>
                                        <div className="flex flex-col gap-1 items-start justify-center">
                                            <h4 className="text-small font-semibold leading-none text-default-600">{user.userFullName}</h4>
                                            <h5 className="text-small tracking-tight text-default-400">{user.primaryEmail}</h5>
                                        </div>
                                    </div>
                                </CardHeader>
                              {/*  <CardBody className="px-3 py-0 text-small text-default-400">
                                </CardBody>*/}
                                <Divider/>
                                <CardFooter className="gap-3 justify-end w-full">
                                    <Button
                                        color="primary"
                                        radius="sm"
                                        size="sm"
                                        fullWidth
                                        variant="flat"
                                    >
                                        Редагувати
                                    </Button>
                                    <Button
                                        fullWidth
                                        color="danger"
                                        radius="sm"
                                        size="sm"
                                        variant="flat"
                                    >
                                        Видалити
                                    </Button>
                                </CardFooter>
                            </Card>
                        );
                    })}
            </div>
            <div className={cn("py-2 px-2 flex justify-between items-center", {
                "hidden": response.students.length === 0
            })}>
                <span className="w-[30%] text-small text-default-400">
                    Студентів на сторінці: { response.students.length > (rowsPerPage * currentPage) ?
                    rowsPerPage * currentPage
                    : response.students.length
                }/{response.students.length}
                </span>
                <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="primary"
                    page={currentPage}
                    total={pages}
                    onChange={setCurrentPage}
                    variant="flat"
                />
                <div className="hidden sm:flex w-[30%] justify-end gap-4">
                    <Button isDisabled={currentPage === 1} color='primary' size="md" variant="flat"
                            onPress={onPreviousPage}>
                        Назад
                    </Button>
                    <Button isDisabled={pages === currentPage} color='primary' size="md" variant="flat"
                            onPress={onNextPage}>
                        Вперед
                    </Button>
                </div>
            </div>
        </Layout>
    )
}
