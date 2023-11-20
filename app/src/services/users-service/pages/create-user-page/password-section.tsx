import type {Fieldset} from "@conform-to/react";
import {conform} from "@conform-to/react";
import {CheckboxField, PasswordField} from "~/src/forms";
import type {CreateUser} from "./create-user-schema";
import {useState} from "react";

export default function PasswordSection(props: {
    fields: Fieldset<CreateUser>
}) {
    const {fields} = props;
    const [generatePassword, setGeneratePassword] = useState(false)
    return (
        <section className="w-full flex flex-col gap-4">
            <h3 className="divider text-center text-lg font-medium">
                Пароль
            </h3>
            <CheckboxField
                config={fields.generatePassword}
                label="Згенерувати пароль"
                onValueChange={(checked) => {
                    setGeneratePassword(checked)
                }}
            />
            <PasswordField
                {...conform.input(fields.password)}
                label="Пароль"
                placeholder="Введіть пароль"
                disabled={!generatePassword}
            />
        </section>
    )
}