import type {Fieldset} from "@conform-to/react";
import {AutocompleteField, DateField} from "~/src/forms";
import type {Education} from "~/src/services/users-service/pages/create-user-page/education-schema";
import {useLoaderData} from "@remix-run/react";
import type {EducationForm, EducationLevel, EducationProgram, FinancialSource} from "~/src/entities";

type LoaderData = {
    educationPrograms: EducationProgram[]
    educationForms: EducationForm[]
    educationLevels: EducationLevel[]
    financialSources: FinancialSource[]
}
export default function EducationSection(props: {
    fields: Fieldset<Education>
}) {
    const {fields} = props;
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
                config={educationProgramId}
            />
            <AutocompleteField
                options={educationForms}
                getLabel={item => item.name}
                label="Форма навчання"
                placeholder="Виберіть форму навчання"
                config={educationFormId}
            />
            <AutocompleteField
                options={educationLevels}
                getLabel={item => item.name}
                label="Освітній рівень"
                placeholder="Виберіть освітній рівень"
                config={educationLevelId}
            />
            <AutocompleteField
                options={financialSources}
                getLabel={item => item.name}
                label="Джерело фінансування"
                placeholder="Виберіть джерело фінансування"
                config={financialSourceId}
            />

            <DateField
                config={start}
                label="Початок навчання"
                placeholder="Введіть дату початку навчання"
            />
            <DateField
                config={end}
                label="Завершення навчання"
                placeholder="Введіть дату завершення навчання"
            />
        </section>
    )
}