import type {Fieldset} from "@conform-to/react";
import {CheckboxField, PasswordField} from "~/src/forms";
import type {CreateUser} from "./create-user-schema";
import {useState} from "react";

export default function PasswordSection(props: {
    fields: Fieldset<CreateUser>
    formId: string
}) {
    const {fields,formId} = props;
    const [generatePassword, setGeneratePassword] = useState(false)
    return (
        <section className="w-full flex flex-col gap-4">
            <h3 className="divider text-center text-lg font-medium">
                Пароль
            </h3>
            <CheckboxField
                name={fields.generatePassword.name}
                formId={formId}
                label="Згенерувати пароль"
                onValueChange={(checked) => {
                    setGeneratePassword(checked)
                }}
            />
            <PasswordField
                name={fields.password.name}
                formId={formId}
                label="Пароль"
                placeholder="Введіть пароль"
                disabled={!generatePassword}
            />
        </section>
    )
}