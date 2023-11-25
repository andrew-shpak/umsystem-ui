import {CheckboxField} from "~/src/forms";
import type {CreateUser} from "./create-user-schema";
import type {FieldsetMetadata, Pretty} from "~/src/shared/types";

export default function ValidationSection(props: {
    fields: Pretty<FieldsetMetadata<CreateUser>>
    formId: string
}) {
    const {fields} = props;
    return (
        <section className="w-full flex flex-col gap-4">
            <h3 className="divider text-center text-lg font-medium">
                Валідація
            </h3>
            <CheckboxField
                name={fields.validation.name}
                formId={props.formId}
                label="Перевірка на збіги"
                color={"danger"}
            />
        </section>
    )
}