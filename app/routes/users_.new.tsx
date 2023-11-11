import {Form, Link, useLoaderData, useLocation, useOutletContext} from "@remix-run/react"
import type {EducationForm, EducationProgram, Organization, Role} from "~/src/entities";
import {useForm} from "@conform-to/react";
import type {ContextType} from "~/src/shared/types";
import Layout from "~/src/layout";
import {getFieldsetConstraint, parse} from "@conform-to/zod";
import {routes} from "~/src/constants";
import {CreateUserForm, createUserSchema} from "~/src/services/users-service/pages/create-user-page";
import styles from "../styles/layout.css";
import {Button} from "@nextui-org/react";
import type {LinksFunction} from "@remix-run/node";

const pageTitle = 'Створення користувача'
export const links: LinksFunction = () => [
    { rel: "stylesheet", href: styles }
];

export function meta() {
    return [
        {
            title: pageTitle,
            description: 'Створення користувача організації',
        },
    ]
}

/*export const loader: LoaderFunction = async ({request}) => {
  const {headers} = request
  const cookie = headers.get('cookie') as string
  const res = await fetch(
    `${constants.USERS_SERVICE_BASE_URL}/${endpoints.educationPrograms}`,
    {
      headers: {
        Accept: 'application/json',
        cookie,
      },
      credentials: 'include',
    },
  )
  const educationFormsReq = await fetch(
    `${constants.USERS_SERVICE_BASE_URL}/${endpoints.educationForms}`,
    {
      headers: {
        Accept: 'application/json',
        cookie,
      },
      credentials: 'include',
    },
  )
  const organizationRes = await fetch(
    `${constants.ORGANIZATIONS_SERVICE_BASE_URL}/${endpoints.organizations}`,
    {
      method: 'GET',
      headers: {Accept: 'application/json', cookie},
      credentials: 'include',
    },
  )
  if (res.status === 401) {
    return redirect(`${routes.signIn}?redirect=${request.url}`)
  }
  if (res.status === 403) {
    return redirect(routes.accessDenied)
  }
  const rolesReq = await fetch(
    `${constants.PERMISSIONS_SERVICE_BASE_URL}/${endpoints.roles}`,
    {
      headers: {
        Accept: 'application/json',
        cookie,
      },
      credentials: 'include',
    },
  )
  const roles = (await rolesReq.json()) as Role[]
  const educationPrograms = await res.json()
  const educationForms = await educationFormsReq.json()
  const organizations = await organizationRes.json()
  return json({
    ...educationPrograms,
    ...educationForms,
    ...roles,
    ...organizations,
  })
}
export const action: ActionFunction = async ({request}) => {
  const {headers} = request
  const cookie = headers.get('cookie') as string
  const session = await getSession(cookie)
  const text = await request.text()
  const values = parse(text, {
    allowDots: true,
    depth: 1000,
  })
  if (!values.birthday) {
    values.birthday = undefined
  }
  if (!values.passport?.number) {
    values.passport = undefined
  }
  if (!values.education?.start) {
    values.education = undefined
  }
  const save = values.action === 'save'
  const url = save
    ? `${constants.USERS_SERVICE_BASE_URL}/${endpoints.users}`
    : `${constants.USERS_SERVICE_BASE_URL}/${endpoints.users}/validation`
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      cookie,
    },
    credentials: 'include',
    body: JSON.stringify(values),
  })
  if (response.ok && save) {
    setSuccessMessage(session, 'Користувача успішно створено')
    return redirect(`${routes.users}`, {
      headers: {'Set-Cookie': await commitSession(session)},
    })
  }
  if (response.status === 400) {
    const errors = await response.json()
    return json({errors, values})
  }
  if (response.status === 401) {
    return redirect(`${routes.signIn}?redirect=${request.url}`)
  }
  const result = await response.json()
  return json({...result, values})
}*/
/*type ActionData = {
  users:
    | {
        url: string
        primaryEmail: string
        fullName: {
          name: string
          lastName: string
          middleName: string
          email: string
          userFullName: string
        }[]
      }[]
    | null
  errors?: {
    lastName?: string
    name?: string
    middleName?: string
    identityNumber?: string
    birthday?: string
    password?: string
    roleId?: string
    generatePassword?: string
    recoveryEmail?: string
    recoveryPhone?: string
    studentId?: string
    organizationId?: string
    passport?: {
      series?: string
      number?: string
      issueDate?: string
      validUntil?: string
      issuedBy?: string
    }
    education?: {
      educationFormId?: string
      educationProgramId?: string
      start?: string
      end?: string
    }
  }
  values: {
    lastName?: string
    name?: string
    middleName?: string
    identityNumber?: string
    roleId?: string
    birthday?: string
    password?: string
    generatePassword?: boolean
    recoveryEmail?: string
    recoveryPhone?: string
    studentId?: string
    organizationId?: string
    passport?: {
      series?: string
      number?: string
      issueDate?: string
      validUntil?: string
      issuedBy?: string
    }
    education?: {
      educationFormId?: string
      educationProgramId?: string
      start?: string
      end?: string
    }
  }
}*/
export const handle = {
    breadcrumb: () => <span>{pageTitle}</span>,
}
type LoaderData = {
    educationForms: EducationForm[]
    educationPrograms: EducationProgram[]
    roles: Role[]
    organizations: Organization[]
}
export default function CreateNewUserPage() {
    const context = useOutletContext<ContextType>()
    const response = useLoaderData<LoaderData>()
    // const actionData = useActionData<ActionData>()
    // const [password, setPassword] = useState<string>('')
    // const [showPassword, setShowPassword] = useState<boolean>(false)
    // const canDisableUserValidation = context.permissions.includes(
    //   DISABLE_USERS_VALIDATION,
    // )
    // const canSelectUserOrganization = context.permissions.includes(
    //   SELECT_USER_ORGANIZATION,
    // )
    const location = useLocation()
    // console.log(actionData)
    const [form, fields] = useForm({
        defaultValue: {
            studentIdentifier: undefined,
            middleName: undefined
        },
        constraint: getFieldsetConstraint(createUserSchema),
        onValidate({formData}) {
            return parse(formData, {schema: createUserSchema});
        },
        shouldValidate: "onBlur",
    });
    return (
        <Layout title="Створення нового користувача" {...context}>
            <Form
                method="post"
                {...form.props}
                action={`${routes.users}/new${location.search}`}
                className="mb-10 mt-4 flex flex-col items-center justify-center gap-2"
            >
                <CreateUserForm fields={fields} {...response}/>
                <div className="flex w-full mt-7 flex-row items-center justify-center gap-4">
                    <Button
                        as={Link}
                        to={`${routes.users}${location.search}`}
                        prefetch="intent"
                        color="danger"
                        variant="flat"
                        className="md:w-1/4"
                    >
                        Скасувати
                    </Button>
                    <Button
                        type="submit"
                        className="md:w-1/4"
                        name="action"
                        color="primary"
                        variant="flat"
                        value="validate"
                    >
                        Перевірити
                    </Button>
                    <Button
                        type="submit"
                        value="save"
                        name="action"
                        variant="flat"
                        color={"success"}
                        className={"md:w-1/4"}
                    >
                        Зберегти
                    </Button>
                </div>
            </Form>
        </Layout>
    )
}
