import type {Fieldset} from "@conform-to/react";
import type {CreateUser} from "./create-user-schema";
import type {EducationForm, EducationProgram, Organization, Role} from "~/src/entities";
import CreateUserFullNameForm from "./create-user-full-name-form";
import CreateUserInformationForm from "./create-user-information-form";

export default function CreateUserForm(props: {
    fields: Fieldset<CreateUser>
    educationForms: EducationForm[]
    educationPrograms: EducationProgram[]
    roles: Role[]
    organizations: Organization[]
}) {
    const {fields, educationForms, educationPrograms, roles, organizations} = props;
    return (
        <div className="md:grid md:grid-cols-2 md:gap-7 w-full">
            <CreateUserFullNameForm fields={fields}/>
            <CreateUserInformationForm fields={fields}/>
        </div>
    )
}