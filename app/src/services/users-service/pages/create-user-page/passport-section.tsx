import type {FieldConfig, Fieldset} from "@conform-to/react";
import {conform, useFieldset} from "@conform-to/react";
import {AutocompleteField, DateField, TextField} from "~/src/forms";
import type {CreateUser} from "./create-user-schema";
import { useRef } from "react";
import type {Passport} from "./passport-schema";

export default function PassportForm(props: {
    config: FieldConfig<Passport>;
}) {
    const {config} = props;
    const ref = useRef<HTMLFieldSetElement>(null);
    const { series,number,validUntil, issuedBy,issueDate } = useFieldset(ref, config);

    return (
        <fieldset ref={ref} className="w-full flex flex-col gap-4">
            <h3 className="divider text-center text-lg font-medium">
                Паспорт
            </h3>
                {/*<AutocompleteField*/}
                {/*    name="passport.type"*/}
                {/*    getLabel={f => f.name}*/}
                {/*    options={[{name: '1', id: '1'}]}*/}
                {/*    label="Тип документу"*/}
                {/*    placeholder="Виберіть тип документу"*/}
                {/*    ariaLabel="Тип документу"*/}
                {/*    required={false}*/}
                {/*/>*/}
                <TextField
                    {...conform.input(series)}
                    label="Серія паспорта"
                    placeholder="Введіть серію паспорта"
                />
                <TextField
                    {...conform.input(number)}
                    label="Номер паспорта"
                    placeholder="Введіть номер паспорта"
                />
                <TextField
                    {...conform.input(issuedBy)}
                    label="Ким видано"
                    placeholder="Введіть місце видачі паспорта"
                />
                <DateField
                    {...conform.input(issueDate)}
                    label="Дата видачі"
                    placeholder="Введіть дату видачі"
                />
                <DateField
                    {...conform.input(validUntil)}
                    label="Дійсний до"
                    placeholder="Введіть дату закінчення строку дії паспорта"
                />
            </fieldset>
    )
}