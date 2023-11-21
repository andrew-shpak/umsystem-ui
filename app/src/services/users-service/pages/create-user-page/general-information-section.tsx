import type {Fieldset} from "@conform-to/react";
import {DateField, TextField} from "~/src/forms";
import type {CreateUser} from "./create-user-schema";

export default function GeneralInformationSection(props: {
    fields: Fieldset<CreateUser>
}) {
    const {fields} = props;
    return (
        <section className="w-full flex flex-col gap-4">
            <h3 className="divider text-center text-lg font-medium">
                Інформація про користувача
            </h3>
            <TextField
                label="Резервна пошта"
                placeholder="Введіть резервну пошту користувача"
                description="Пароль буде автоматично надісланий на пошту"
                config={fields.recoveryEmail}
            />
            <TextField
                label="Резервний телефон"
                placeholder="Введіть резервний телефон користувача у форматі +380983456789"
                config={fields.recoveryPhone}
            />
            <DateField
                config={fields.birthday}
                label="Дата народження"
                placeholder="Введіть дату народження"
            />
            <TextField
                label="ID ФО"
                placeholder="Введіть ID ФО"
                description="Введіть ID фізичної особи із ЄДБО"
                config={fields.studentId}
            />
        </section>
    )
}