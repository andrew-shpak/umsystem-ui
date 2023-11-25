import {conform} from "@conform-to/react";
import type {Faculty} from "~/src/entities";
import {DateField, TextField} from "~/src/forms";
import type {FieldsetMetadata, Pretty} from "~/src/shared/types";

export default function FacultiesForm(props: {
    fields: Pretty<FieldsetMetadata<Faculty>>
    formId: string
}) {
    const {fields, formId} = props;
    return (
        <>
            <input  {...conform.input(fields.url, {hidden: true})} />
            <TextField
                label={'Назва'}
                placeholder={'Введіть назву факультету'}
                name={fields.name.name}
                formId={formId}
            />
            <TextField
                label={'Скорочена назва факультету'}
                placeholder={'Введіть скорочену назву факультету'}
                name={fields.shortName.name}
                formId={formId}
            />
            <DateField
                name={fields.start.name}
                formId={formId}
                label={'Дата початку'}
                placeholder={'Введіть дату початку створення факультету'}
            />
            <DateField
                name={fields.end.name}
                formId={formId}
                label={'Дата завершення'}
                placeholder={'Введіть дату закриття факультету'}
            />
        </>
    )
}