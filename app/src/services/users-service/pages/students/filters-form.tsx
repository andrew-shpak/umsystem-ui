import type {StudentsPageFilters} from "./filters-schema";
import type {Fieldset} from "@conform-to/react";
import type {EducationForm, EducationLevel, EducationProgram, FinancialSource, User} from "~/src/entities";
import {AutocompleteField, CheckboxField, DateField, NumberField, TextField} from "~/src/forms";
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
    formId: string
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
                    name={fields.educationProgramId.name}
                    formId={props.formId}
                />
            </div>
            <div className="w-full flex flex-col md:flex-row gap-4 items-center">
                <DateField
                    label={'Дата початку'}
                    placeholder={'Введіть дату початку навчання'}
                    name={fields.start.name}
                    formId={props.formId}
                />
                <DateField
                    label={'Дата завершення'}
                    placeholder={'Введіть дату завершення навчання'}
                    name={fields.end.name}
                    formId={props.formId}
                />
            </div>
            <div className="w-full flex flex-col md:flex-row gap-4 items-center  lg:col-span-2">
                <AutocompleteField
                    options={educationForms}
                    getLabel={item => item.name}
                    label="Форма навчання"
                    placeholder="Виберіть форму навчання"
                    name={fields.educationFormId.name}
                    formId={props.formId}
                />
                <AutocompleteField
                    options={educationLevels}
                    getLabel={item => item.name}
                    label="Освітній рівень"
                    placeholder="Виберіть освітній рівень"
                    name={fields.educationLevelId.name}
                    formId={props.formId}
                />
            </div>
            <div className="w-full flex flex-col md:flex-row gap-4 items-center">
                <AutocompleteField
                    options={financialSources}
                    getLabel={item => item.name}
                    label="Джерело фінансування"
                    placeholder="Виберіть джерело фінансування"
                    name={fields.financialSourceId.name}
                    formId={props.formId}
                />

                <NumberField
                    name={fields.course.name}
                    formId={props.formId}
                    label={'Курс'}
                    placeholder={'Введіть курс'}
                />
            </div>


            <div className="w-full flex flex-col md:flex-row gap-4 items-center lg:col-span-3 md:col-span-2">
                <TextField
                    label="ПІП"
                    placeholder="Введіть ПІП студента"
                    name={fields.fullName.name}
                    formId={props.formId}
                />

                <CheckboxField
                    name={fields.deleted.name}
                    formId={props.formId}
                    label="Видалені"
                />
            </div>
            <div className="w-full flex flex-col md:flex-row gap-4 items-center lg:col-span-2">
                <AutocompleteField
                    options={users}
                    getLabel={item => `${item.userFullName} (${item.primaryEmail}) ${(item.deleted ? " (Видалений)" : "")}`}
                    label="Користувач"
                    placeholder="Виберіть користувача"
                    name={fields.userId.name}
                    formId={props.formId}
                />
            </div>
        </>
    )
}