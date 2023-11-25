import {AutocompleteField, DateField} from "~/src/forms";
import {useLoaderData} from "@remix-run/react";
import type {EducationForm, EducationLevel, EducationProgram, FinancialSource} from "~/src/entities";
import type {Field} from "@conform-to/react";
import {useFieldset} from "@conform-to/react";
import type {Education} from "./education-schema";

type LoaderData = {
    educationPrograms: EducationProgram[]
    educationForms: EducationForm[]
    educationLevels: EducationLevel[]
    financialSources: FinancialSource[]
}
export default function EducationSection(props: Field<Education>) {
    const {formId, name} = props
    const fields = useFieldset({
        formId: formId,
        name
    });
    const {
        start,
        educationFormId,
        educationProgramId,
        end,
        educationLevelId,
        financialSourceId,
    } = fields
    const {
        educationPrograms,
        educationLevels,
        educationForms,
        financialSources,
    } = useLoaderData<LoaderData>();
    return (
        <section className="w-full flex flex-col gap-4">
            <h3 className="divider text-center text-lg font-medium">
                Освіта
            </h3>
            <AutocompleteField
                options={educationPrograms}
                getLabel={item => item.name}
                label="Освітня програма"
                placeholder="Виберіть освітню програму"
                name={educationProgramId.name}
                formId={formId}
            />
            <AutocompleteField
                options={educationForms}
                getLabel={item => item.name}
                label="Форма навчання"
                placeholder="Виберіть форму навчання"
                name={educationFormId.name}
                formId={formId}
            />
            <AutocompleteField
                options={educationLevels}
                getLabel={item => item.name}
                label="Освітній рівень"
                placeholder="Виберіть освітній рівень"
                name={educationLevelId.name}
                formId={formId}
            />
            <AutocompleteField
                options={financialSources}
                getLabel={item => item.name}
                label="Джерело фінансування"
                placeholder="Виберіть джерело фінансування"
                name={financialSourceId.name}
                formId={formId}
            />

            <DateField
                name={start.name}
                formId={formId}
                label="Початок навчання"
                placeholder="Введіть дату початку навчання"
            />
            <DateField
                name={end.name}
                formId={formId}
                label="Завершення навчання"
                placeholder="Введіть дату завершення навчання"
            />
        </section>
    )
}