import {Form, useLoaderData, useOutletContext} from "@remix-run/react"
import type {ContextType} from "~/src/shared/types";
import Layout from "~/src/layout";
import styles from "../styles/layout.css";
import {Avatar, Button, Card, CardBody, CardFooter, CardHeader, Pagination} from "@nextui-org/react";
import *as  React from "react";
import {useForm} from "@conform-to/react";
import {getFieldsetConstraint, parse} from "@conform-to/zod";
import type {User} from "~/src/entities";
import type { LinksFunction, LoaderFunction} from "@remix-run/node";
import {json, redirect} from "@remix-run/node";
import {environment} from "~/environment.server";
import {endpoints, routes} from "~/src/constants";
import {UsersPageFiltersForm} from "~/src/services/users-service/pages";
import {usersPageFiltersSchema} from "~/src/services/users-service/pages/users";

const pageTitle = 'Список користувачів'
export const links: LinksFunction = () => [
    { rel: "stylesheet", href: styles }
];
export function meta() {
    return [
        {
            title: pageTitle,
            description: 'Список користувачів організації',
        },
    ]
}

export const loader: LoaderFunction = async ({request}) => {
    const {headers} = request
    const cookie = headers.get('cookie') as string
    const url = new URL(request.url)
    const res = await fetch(
        `${environment().USERS_SERVICE_BASE_URL}/${endpoints.users}${url.search}`,
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
    const response = await res.json();
    return json({
        ...response,
        cdnUrl: environment().CDN_BASE_URL
    })
}
export default function CreateNewUserPage() {
    const context = useOutletContext<ContextType>()
    const response = useLoaderData();
    const [form, fields] = useForm({
        constraint: getFieldsetConstraint(usersPageFiltersSchema),
        onValidate({formData}) {
            return parse(formData, {schema: usersPageFiltersSchema});
        },
        shouldValidate: "onBlur",
    });
    const [currentPage, setCurrentPage] = React.useState(1);
    const rowsPerPage = 12;
    const pages = Math.ceil(response.users.length / rowsPerPage);
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
    return (
        <Layout title={pageTitle} {...context}>

            <Form
                {...form.props}
                className="gap-2"
            >
                <UsersPageFiltersForm fields={fields}>
                    <Button
                        type="submit"
                        value="save"
                        name="action"
                        variant="flat"
                        color={"primary"}
                    >
                        Пошук
                    </Button>
                </UsersPageFiltersForm>
            </Form>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
                {response.users
                    .sort((a, b) => a.userFullName.localeCompare(b.userFullName))
                    .slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage)
                    .map((user: User) => {
                        return (
                            <Card className="max-w-[450px]" key={user.url}>
                                <CardHeader className="justify-between">
                                    <div className="flex gap-5">
                                        <Avatar isBordered
                                                radius="full"
                                                size="md"
                                                src={user.avatar ? `${response.cdnUrl}/avatars/${user.avatar}` : undefined}
                                                name={user.userFullName}/>
                                        <div className="flex flex-col gap-1 items-start justify-center">
                                            <h4 className="text-small font-semibold leading-none text-default-600">{user.userFullName}</h4>
                                            <h5 className="text-small tracking-tight text-default-400">{user.primaryEmail}</h5>
                                        </div>
                                    </div>

                                </CardHeader>
                                <CardBody className="px-3 py-0 text-small text-default-400">
                                    <p>
                                        Frontend developer and UI/UX enthusiast. Join me on this coding adventure!
                                    </p>
                                </CardBody>
                                <CardFooter className="gap-3 justify-end">
                                        <Button
                                            color="primary"
                                            radius="md"
                                            size="sm"
                                            variant="flat"
                                        >
                                            Редагувати
                                        </Button>
                                        <Button
                                            color="danger"
                                            radius="md"
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
            <div className="py-2 px-2 flex justify-between items-center">
                <span className="w-[30%] text-small text-default-400"/>
                <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="primary"
                    page={currentPage}
                    total={response.users.length}
                    onChange={setCurrentPage}
                    variant="flat"
                />
                <div className="hidden sm:flex w-[30%] justify-end gap-4">
                    <Button isDisabled={currentPage === 1} color='primary' size="md" variant="flat" onPress={onPreviousPage}>
                        Назад
                    </Button>
                    <Button isDisabled={pages === currentPage} color='primary' size="md" variant="flat" onPress={onNextPage}>
                        Вперед
                    </Button>
                </div>
            </div>
        </Layout>
    )
}
