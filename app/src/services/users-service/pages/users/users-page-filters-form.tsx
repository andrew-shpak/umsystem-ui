import type {ReactNode} from "react";
import type {UsersPageFilters} from "./users-page-filters-schema";
import type {Fieldset} from "@conform-to/react";

export default function UsersPageFiltersForm(props: {
    fields: Fieldset<UsersPageFilters>
    children: ReactNode
}) {
    const {fields} = props;
    return (
        <>
            <div className="w-full flex flex-col md:grid md:grid-cols-2 gap-4">

            </div>
            {props.children}
        </>
    )
}