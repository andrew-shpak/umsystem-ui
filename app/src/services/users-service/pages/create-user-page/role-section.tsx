import type {Fieldset} from "@conform-to/react";
import {AutocompleteField} from "~/src/forms";
import type {CreateUser} from "./create-user-schema";
import {useLoaderData} from "@remix-run/react";
import type {Role} from "~/src/entities";

type LoaderData = {
    roles: Role[]
}
export default function RoleSection(props: {
    fields: Fieldset<CreateUser>
    formId: string
}) {
    const {fields,formId} = props;
    const {
        roles
    } = useLoaderData<LoaderData>();
    return (
        <section className="w-full flex flex-col gap-4">
            <h3 className="divider text-center text-lg font-medium">
                Роль
            </h3>
            <AutocompleteField
                options={roles}
                getLabel={item => item.name}
                label="Роль"
                placeholder="Виберіть роль"
                name={fields.roleId.name}
                formId={formId}
            />
        </section>
    )
}