import {TextField} from "~/src/forms";
import {type Fieldset} from "@conform-to/react";
import type {CreateUser} from "./create-user-schema";

export default function FullNameSection(props: {
    fields: Fieldset<CreateUser>
}) {
    const {fields} = props;
    return (
        <section className="w-full flex flex-col gap-4">
            <h3 className="divider text-center text-lg font-medium">
                ПІБ
            </h3>
            <TextField
                label="Прізвище"
                placeholder="Введіть прізвище користувача"
                config={fields.lastName}
            />
            <TextField
                label="Ім'я"
                placeholder="Введіть ім'я користувача"
                config={fields.name}
            />
            <TextField
                name="middleName"
                label="Побатькові"
                placeholder="Введіть побатькові користувача"
                config={fields.middleName}
            />
            <TextField
                label="РНОКПП"
                placeholder="Введіть РНОКПП користувача"
                description="Реєстраційний номер облікової картки платника податків"
                config={fields.identityNumber}
            />
        </section>
    )
}