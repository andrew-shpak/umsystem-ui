import {DataGrid} from "~/src/data-grid";
import {userFullNameColumns} from "~/src/columns";
import type {FullName} from "~/src/shared/types";

export default function UserFullNamesTable(props: {
    fullName: FullName[]
}) {

    return (
        <DataGrid
            rows={props.fullName}
            columns={userFullNameColumns}
            isCreatable={false}
            isEditable={false}
            isDeletable={false}
            isCopyable={false}
        />
    )
}