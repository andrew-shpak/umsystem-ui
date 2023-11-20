import type {StudentsPageFilters} from "./filters-schema";
import type {Fieldset} from "@conform-to/react";
import {conform} from "@conform-to/react";
import type {EducationForm, EducationLevel, EducationProgram, FinancialSource, User} from "~/src/entities";
import {AutocompleteField, CheckboxField, DateField, NumberField} from "~/src/forms";
import {useLoaderData} from "@remix-run/react";

type LoaderData = {
    educationPrograms: EducationProgram[]
    educationForms: EducationForm[]
    educationLevels: EducationLevel[]
    financialSources: FinancialSource[]
    users: User[]
}
export default function FiltersForm(props: {
    fields: Fieldset<StudentsPageFilters>
}) {
    const {
        fields,
    } = props;
    const {
        educationPrograms,
        educationLevels,
        educationForms,
        financialSources,
        users,
    } = useLoaderData<LoaderData>();
    return (
        <>
            <div className="w-full flex flex-col md:flex-row gap-4 items-center lg:col-span-2">
                <AutocompleteField
                    options={educationPrograms}
                    getLabel={item => item.name}
                    label="Освітня програма"
                    placeholder="Виберіть освітню програму"
                    config={fields.educationProgramId}
                />
            </div>
            <div className="w-full flex flex-col md:flex-row gap-4 items-center">
                <DateField
                    config={fields.start}
                    errorMessage={fields.start.error}
                    label={'Дата початку'}
                    placeholder={'Введіть дату початку навчання'}
                />
                <DateField
                    config={fields.end}
                    label={'Дата завершення'}
                    placeholder={'Введіть дату завершення навчання'}
                />
            </div>
            <div className="w-full flex flex-col md:flex-row gap-4 items-center  lg:col-span-2">
                <AutocompleteField
                    options={educationForms}
                    getLabel={item => item.name}
                    label="Форма навчання"
                    placeholder="Виберіть форму навчання"
                    config={fields.educationFormId}
                />
                <AutocompleteField
                    options={educationLevels}
                    getLabel={item => item.name}
                    label="Освітній рівень"
                    placeholder="Виберіть освітній рівень"
                    config={fields.educationLevelId}
                />
            </div>
            <div className="w-full flex flex-col md:flex-row gap-4 items-center">
                <AutocompleteField
                    options={financialSources}
                    getLabel={item => item.name}
                    label="Джерело фінансування"
                    placeholder="Виберіть джерело фінансування"
                    config={fields.financialSourceId}
                />

                <NumberField
                    {...conform.input(fields.year)}
                    errorMessage={fields.year.error}
                    label={'Курс'}
                    placeholder={'Введіть курс'}
                />
            </div>


            <div className="w-full flex flex-col md:flex-row gap-4 items-center lg:col-span-2">
                <AutocompleteField
                    options={users}
                    getLabel={item => `${item.userFullName} (${item.primaryEmail}) ${(item.deleted ? " (Видалений)" : "")}`}
                    label="Користувач"
                    placeholder="Виберіть користувача"
                    config={fields.userId}
                />

                <CheckboxField
                    config={fields.deleted}
                    label="Видалені"
                />
            </div>
        </>
    )
}