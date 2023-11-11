import {TextField} from "~/src/forms";
import {conform, type Fieldset} from "@conform-to/react";
import type {CreateUser} from "./create-user-schema";

export default function CreateUserFullNameForm(props: {
    fields: Fieldset<CreateUser>
}) {
    const {fields} = props;
    return (
        <div className="w-full flex flex-col gap-4">
            <div className="divider mb-4 text-center text-lg font-medium">
                ПІБ
            </div>
            <TextField
                {...conform.input(fields.lastName)}
                label="Прізвище"
                placeholder="Введіть прізвище користувача"
                errorMessage={fields.lastName.error}
            />
            <TextField
                {...conform.input(fields.name)}
                label="Ім'я"
                placeholder="Введіть ім'я користувача"
                errorMessage={fields.name.error}
            />
            <TextField
                {...conform.input(fields.middleName)}
                name="middleName"
                label="Побатькові"
                placeholder="Введіть побатькові користувача"
                errorMessage={fields.middleName.error}
            />
            <TextField
                {...conform.input(fields.identityNumber)}
                label="РНОКПП"
                placeholder="Введіть РНОКПП користувача"
                helperText="Реєстраційний номер облікової картки платника податків"
                errorMessage={fields.identityNumber.error}
            />
        </div>
    )
}