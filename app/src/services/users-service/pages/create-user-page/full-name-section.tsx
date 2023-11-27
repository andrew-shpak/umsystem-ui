import {TextField} from "~/src/forms";
import type {CreateUser} from "./create-user-schema";
import type {FieldsetMetadata, Pretty} from "~/src/shared/types";

export default function FullNameSection(props: {
    fields: Pretty<FieldsetMetadata<CreateUser>>
    formId: string
}) {
    const {formId, fields} = props;
    return (
        <section className="w-full flex flex-col gap-4">
            <h3 className="divider text-center text-lg font-medium">
                ПІБ
            </h3>
            <TextField
                label="Прізвище"
                placeholder="Введіть прізвище користувача"
                name={fields.lastName.name}
                formId={formId}
            />
            <TextField
                label="Ім'я"
                placeholder="Введіть ім'я користувача"
                name={fields.name.name}
                formId={formId}
            />
            <TextField
                label="Побатькові"
                placeholder="Введіть побатькові користувача"
                name={fields.middleName.name}
                formId={formId}
            />
            <TextField
                label="РНОКПП"
                placeholder="Введіть РНОКПП користувача"
                description="Реєстраційний номер облікової картки платника податків"
                name={fields.identityNumber.name}
                formId={formId}
            />
        </section>
    )
}