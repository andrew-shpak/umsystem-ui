import type {Fieldset} from "@conform-to/react";
import {conform} from "@conform-to/react";
import type {Faculty} from "~/src/entities";
import {DateField, TextField} from "~/src/forms";

export default function FacultiesForm(props: {
    fields: Fieldset<Faculty>
}) {
    const {fields} = props;
    return (
        <>
            <input  {...conform.input(fields.url, {hidden: true})} />
            <TextField
                label={'Назва'}
                placeholder={'Введіть назву факультету'}
                config={fields.name}
            />
            <TextField
                label={'Скорочена назва факультету'}
                placeholder={'Введіть скорочену назву факультету'}
                config={fields.shortName}
            />
            <DateField
                config={fields.start}
                label={'Дата початку'}
                placeholder={'Введіть дату початку створення факультету'}
            />
            <DateField
                config={fields.end}
                label={'Дата завершення'}
                placeholder={'Введіть дату закриття факультету'}
            />
        </>
    )
}