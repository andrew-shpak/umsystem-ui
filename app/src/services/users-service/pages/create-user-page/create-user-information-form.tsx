import {conform, Fieldset} from "@conform-to/react";
import {DateField, TextField} from "~/src/forms";
import type {CreateUser} from "./create-user-schema";

export default function CreateUserInformationForm(props: {
    fields: Fieldset<CreateUser>
}) {
    const {fields} = props;
    return (
        <div className="w-full flex flex-col gap-4">
            <div className="divider mb-4 text-center text-lg font-medium">
                Інформація про користувача
            </div>
            <TextField
                {...conform.input(fields.recoveryEmail)}
                label="Резервна пошта"
                placeholder="Введіть резервну пошту користувача"
                helperText="Пароль буде автоматично надісланий на пошту"
                errorMessage={fields.recoveryEmail.error}
            />
            <TextField
                {...conform.input(fields.recoveryPhone)}
                label="Резервний телефон"
                placeholder="Введіть резервний телефон користувача у форматі +380983456789"
                errorMessage={fields.recoveryPhone.error}
            />
            <DateField
                {...conform.input(fields.birthday)}
                label="Дата народження"
                placeholder="Введіть дату народження"
                errorMessage={fields.birthday.error}
            />
            <TextField
                {...conform.input(fields.studentId)}
                label="ID ФО"
                placeholder="Введіть ID ФО"
                helperText="Введіть ID фізичної особи із ЄДБО"
                errorMessage={fields.studentId.error}
            />
        </div>
    )
}