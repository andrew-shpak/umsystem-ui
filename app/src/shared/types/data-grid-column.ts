import type {ReactNode} from "react";

export interface DataGridColumn<T> {
    label?: ReactNode,
    key: Extract<keyof T, string>,
    sortable?: boolean,
    searchable?: boolean,
    className?: string
}