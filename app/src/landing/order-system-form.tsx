import type {Fieldset} from '@conform-to/react';
import {AutocompleteField, TextareaField, TextField} from "~/src/forms";
import type {Order, Tariff} from "~/src/entities";

export default function OrderSystemForm(props: {
    fields: Fieldset<Order>
    tariffs: Tariff[]
    formId: string
}) {
    const {fields, tariffs, formId} = props;
    return (
        <>
            <div className="w-full flex flex-col md:grid md:grid-cols-2 gap-4">
                <TextField
                    name={fields.name.name}
                    formId={formId}
                    label="Ім'я"
                    placeholder="Введіть ім'я"
                />
                <TextField
                    label="Прізвище"
                    placeholder="Введіть прізвище"
                    name={fields.lastName.name}
                    formId={formId}
                />
                <TextField
                    name={fields.phone.name}
                    label="Телефон"
                    placeholder="Введіть номер телефону"
                    description={"Наприклад: +380123456789"}
                    formId={formId}
                />
                <TextField
                    label="Пошта"
                    placeholder="Введіть ел. пошту"
                    name={fields.email.name}
                    formId={formId}
                />
            </div>
            <div className="w-full mt-4">
                <AutocompleteField
                    options={tariffs}
                    getLabel={item => item.name}
                    label="Тариф"
                    placeholder="Виберіть тариф"
                    name={fields.tariffId.name}
                    formId={formId}
                />
            </div>
            <div className="w-full my-4">
                <TextareaField
                    label="Повідомлення"
                    placeholder="Введіть опис вашої задачі"
                    minRows={3}
                    formId={formId}
                    name={fields.message.name}
                />
            </div>

        </>
    )
}