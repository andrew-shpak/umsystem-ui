import {DataGrid} from "~/src/data-grid";
import {userEducationColumns} from "~/src/columns";
import type {UserEducation} from "~/src/shared/types";

export default function UserEducationTable(props: {
    education: UserEducation[]
}) {

    return (
        <DataGrid
            rows={props.education}
            columns={userEducationColumns}
            isCreatable={false}
            isEditable={false}
            isDeletable={false}
            isCopyable={false}
        />
    )
}