import type {DataGridColumn} from "~/src/shared/types";
import type {UserFullName} from "~/src/entities";

const userEducationColumns: DataGridColumn<UserFullName & {
    userFullName: string
    created: string
}>[] = [
    {label: <span>ПІП</span>, key: "userFullName"},
    {label: <span>Прізвище</span>, key: "lastName"},
    {label: <span>Ім'я</span>, key: "name"},
    {label: <span>По батькові</span>, key: "middleName"},
    {label: <span>Створено</span>, key: "created", type: "date"},
]
export default userEducationColumns