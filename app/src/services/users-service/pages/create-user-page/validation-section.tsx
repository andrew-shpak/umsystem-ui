import type {Fieldset} from "@conform-to/react";
import {conform} from "@conform-to/react";
import {CheckboxField} from "~/src/forms";
import type {CreateUser} from "./create-user-schema";

export default function ValidationSection(props: {
    fields: Fieldset<CreateUser>
}) {
    const {fields} = props;
    return (
        <section className="w-full flex flex-col gap-4">
            <h3 className="divider text-center text-lg font-medium">
                Валідація
            </h3>
            <CheckboxField
               config={fields.validation}
                label="Перевірка на збіги"
                color={"danger"}
            />
        </section>
    )
}