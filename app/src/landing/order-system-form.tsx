import type {Fieldset} from '@conform-to/react';
import {conform} from "@conform-to/react";
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
                    {...conform.input(fields.name)}
                    label="Ім'я"
                    placeholder="Введіть ім'я"
                    errorMessage={fields.name.error}
                />
                <TextField
                    {...conform.input(fields.lastName)}
                    label="Прізвище"
                    placeholder="Введіть прізвище"
                    errorMessage={fields.lastName.error}
                />
                <TextField
                    {...conform.input(fields.phone)}
                    label="Телефон"
                    placeholder="Введіть номер телефону"
                    helperText={"Наприклад: +380123456789"}
                    errorMessage={fields.phone.error}
                />
                <TextField
                    {...conform.input(fields.email)}
                    label="Пошта"
                    placeholder="Введіть ел. пошту"
                    errorMessage={fields.email.error}
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
                    {...conform.textarea(fields.message)}
                    label="Повідомлення"
                    placeholder="Введіть опис вашої задачі"
                    minRows={3}
                    errorMessage={fields.message.error}
                />
            </div>

        </>
    )
}