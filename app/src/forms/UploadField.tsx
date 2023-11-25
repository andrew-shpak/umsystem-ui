import type {FieldConfig} from "@conform-to/react";
import {conform, Field, useField} from "@conform-to/react";
import {useFileUploader} from "~/src/hooks";
import type {ReactNode} from "react";
import {cn} from "~/src/shared/utils";


type UploadFieldProps = {
    label?: ReactNode
    placeholder?: string
} & Field<string>
export default function UploadField(props: UploadFieldProps) {
    const {name,formId, label, placeholder} = props;
    const field = useField({ name, formId });
    const fieldProps= conform.input(field);
    const {
        inputProps,
        containerProps,
        files,
        isDragging
    } = useFileUploader({
        ...fieldProps
    });
    return (
        <>
            <div
                {...containerProps}
                className={
                    cn("border-2 border-dashed border-gray-400 w-full rounded-md h-20 pl-2 py-2 cursor-pointer",
                        {
                            "border-blue-500": isDragging,
                        })
                }

            >
                <input
                    {...inputProps}
                />
                <label className={cn("", {
                    required:fieldProps.required,
                })}>{label}</label>
                <div className="text-gray-400 text-sm">{placeholder}</div>
                <div className="text-red-400">{field.errors?.length ? field.errors[0] :'' } </div>
            </div>
            <div className=" mt-2">
                {Array.isArray(files) && (
                    files.map((file) => (
                        <div key={file.name} className="flex items-center justify-between">
                            <span>{file.name}</span>
                            <span>{file.size}</span>
                        </div>
                    ))
                )}
                {!Array.isArray(files) && files && (
                    <div key={files.name} className="flex items-center justify-between">
                        <span>{files.name}</span>
                        <span>{files.size}</span>
                    </div>
                )}
            </div>
        </>
    );
}