import type {DataGridColumn, UserEducation} from "~/src/shared/types";

const userEducationColumns: DataGridColumn<UserEducation>[] = [
    {label: <span>ОПП</span>, key: "educationProgram"},
    {label: <span>Освітній рівень</span>, key: "educationLevel"},
    {label: <span>Форма навчання</span>, key: "educationForm"},
    {label: <span>Фінансування</span>, key: "financialSource"},
    {label: <span>Курс</span>, key: "year"},
    {label: <span>Дата завершення</span>, key: "start", type: "date"},
    {label: <span>Дата початку</span>, key: "end", type: "date"},
    {label: <span>Навчальний план</span>, key: "curriculum"},
]
export default userEducationColumns
