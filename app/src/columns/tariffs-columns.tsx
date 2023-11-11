import type {Tariff} from "~/src/entities";
import {DataGridColumn} from "~/src/shared/types";

const tariffsColumns: DataGridColumn<Tariff>[] = [
    {label: <span>Назва</span>, key: "name"},
    {label: <span>Опис</span>, key: "description"},
    {label: <span>Ціна</span>, key: "price"},
    {key: "id"},
]
export default tariffsColumns
