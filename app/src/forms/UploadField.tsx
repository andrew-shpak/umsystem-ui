import type {FieldConfig} from "@conform-to/react";
import {conform} from "@conform-to/react";
import {useFileUploader} from "~/src/hooks";
import {ReactNode} from "react";


type UploadFieldProps = {
    config: FieldConfig<string>
    label?:ReactNode
};
export default function UploadField(props: UploadFieldProps) {
    const {config,label} = props;
    const fileInputProps = conform.input(config);
    const {
        inputProps,
        containerProps,
        files
    } = useFileUploader({
        ...fileInputProps
    });
    return (
        <div
            {...containerProps}
            className="border-2 border-dashed border-gray-400 w-full rounded-md h-10 pl-2 py-2 cursor-pointer"
        >
            <input
                {...inputProps}
            />
            {label}
            {Array.isArray(files)  && (
                files.map((file) => (
                    <div key={file.name} className="flex items-center justify-between">
                        <span>{file.name}</span>
                        <span>{file.size}</span>
                    </div>
                ))
            )}
            { !Array.isArray(files) && files && (
                <div key={files.name} className="flex items-center justify-between">
                    <span>{files.name}</span>
                    <span>{files.size}</span>
                </div>
            )}
        </div>
    ); 
}