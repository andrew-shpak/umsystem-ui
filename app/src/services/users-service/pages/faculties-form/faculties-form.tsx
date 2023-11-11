import type {Fieldset} from "@conform-to/react";
import {conform} from "@conform-to/react";
import type {Faculty} from "~/src/entities";
import {TextField} from "~/src/forms";

export default function FacultiesForm(props: {
    fields: Fieldset<Faculty>
}) {
    const {fields} = props;
    return (
        <>
            <input  {...conform.input(fields.url, {hidden: true})} />
            <TextField
                {...conform.input(fields.name)}
                label={'Назва'}
                placeholder={'Введіть назву факультету'}
                errorMessage={fields.name.error}
            />
            <TextField
                {...conform.input(fields.shortName)}
                label={'Скорочена назва факультету'}
                placeholder={'Введіть скорочену назву факультету'}
            />
            {/*<DateField*/}
            {/*{...conform.input(fields.start)}*/}
            {/*errorMessage={fields.start.error}*/}
            {/*    label={'Дата початку'}*/}
            {/*    placeholder={'Введіть дату початку створення факультету'}*/}
            {/*/>*/}
            {/*<DateField*/}
            {/*{...conform.input(fields.name)}*/}
            {/*    label={'Дата завершення'}*/}
            {/*    placeholder={'Введіть дату закриття факультету'}*/}
            {/*/>*/}
        </>
    )
}