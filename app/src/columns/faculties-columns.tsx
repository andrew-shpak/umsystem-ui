import type {Faculty} from "~/src/entities";
import type {DataGridColumn} from "~/src/shared/types";

const facultiesColumns: DataGridColumn<Faculty>[] = [
    {label: <span>Назва</span>, key: "name"},
    {label: <span>Скорочена назва</span>, key: "shortName"},
    {label: <span>Дата початку</span>, key: "start"},
    {label: <span>Дата завершення</span>, key: "end"},
    {key: "url"},
]
export default facultiesColumns
