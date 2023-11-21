import type {Fieldset} from "@conform-to/react";
import {conform} from "@conform-to/react";
import {DateField, TextField} from "~/src/forms";
import type {Passport} from "./passport-schema";

export default function PassportForm(props: {
    fields: Fieldset<Passport>
}) {
    const {fields} = props;
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
                config={series}
            />
            <TextField
                label="Номер паспорта"
                placeholder="Введіть номер паспорта"
                config={number}
            />
            <TextField
                label="Ким видано"
                placeholder="Введіть місце видачі паспорта"
                config={issuedBy}
            />
            <DateField
                config={issuedDate}
                label="Дата видачі"
                placeholder="Введіть дату видачі"
            />
            <DateField
                config={validUntil}
                label="Дійсний до"
                placeholder="Введіть дату закінчення строку дії паспорта"
                errorMessage={validUntil.error}
            />
        </section>
    )
}