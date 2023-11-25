import type {Field} from "@conform-to/react";
import {useFieldset} from "@conform-to/react";
import {DateField, TextField} from "~/src/forms";
import type {Passport} from "./passport-schema";

export default function PassportForm(props: Field<Passport>) {
    const {formId, name} = props
    const fields = useFieldset({
        formId: formId,
        name
    });
    const {
        series, number,
        validUntil, issuedBy,
        issuedDate
    } = fields

    return (
        <section className="w-full flex flex-col gap-4">
            <h3 className="divider text-center text-lg font-medium">
                Паспорт
            </h3>
            {/*<AutocompleteField*/}
            {/*    getLabel={f => f.name}*/}
            {/*    options={[{name: '1', id: '1'}]}*/}
            {/*    label="Тип документу"*/}
            {/*    placeholder="Виберіть тип документу"*/}
            {/*    ariaLabel="Тип документу"*/}
            {/*    required={false}*/}
            {/*/>*/}
            <TextField
                label="Серія паспорта"
                placeholder="Введіть серію паспорта"
                name={series.name}
                formId={formId}
            />
            <TextField
                label="Номер паспорта"
                placeholder="Введіть номер паспорта"
                name={number.name}
                formId={formId}
            />
            <TextField
                label="Ким видано"
                placeholder="Введіть місце видачі паспорта"
                name={issuedBy.name}
                formId={formId}
            />
            <DateField
                name={issuedDate.name}
                formId={formId}
                label="Дата видачі"
                placeholder="Введіть дату видачі"
            />
            <DateField
                name={validUntil.name}
                formId={formId}
                label="Дійсний до"
                placeholder="Введіть дату закінчення строку дії паспорта"
            />
        </section>
    )
}