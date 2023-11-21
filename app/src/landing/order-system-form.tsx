import type {Fieldset} from '@conform-to/react';
import {AutocompleteField, TextareaField, TextField} from "~/src/forms";
import type {Order, Tariff} from "~/src/entities";

export default function OrderSystemForm(props: {
    fields: Fieldset<Order>
    tariffs: Tariff[]
}) {
    const {fields, tariffs} = props;
    return (
        <>
            <div className="w-full flex flex-col md:grid md:grid-cols-2 gap-4">
                <TextField
                    config={fields.name}
                    label="Ім'я"
                    placeholder="Введіть ім'я"
                />
                <TextField
                    label="Прізвище"
                    placeholder="Введіть прізвище"
                    config={fields.lastName}
                />
                <TextField
                    config={fields.phone}
                    label="Телефон"
                    placeholder="Введіть номер телефону"
                    description={"Наприклад: +380123456789"}
                />
                <TextField
                    label="Пошта"
                    placeholder="Введіть ел. пошту"
                    config={fields.email}
                />
            </div>
            <div className="w-full mt-4">
                <AutocompleteField
                    options={tariffs}
                    getLabel={item => item.name}
                    label="Тариф"
                    placeholder="Виберіть тариф"
                    config={fields.tariffId}
                />
            </div>
            <div className="w-full my-4">
                <TextareaField
                    label="Повідомлення"
                    placeholder="Введіть опис вашої задачі"
                    minRows={3}
                    config={fields.message}
                />
            </div>

        </>
    )
}