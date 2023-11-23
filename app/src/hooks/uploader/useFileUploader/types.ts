import type {HTMLAttributes, HTMLProps, InputHTMLAttributes, RefObject} from "react";
import type {DropEvent} from "@react-types/shared";

export interface Accept {
    [key: string]: string[];
}

export enum ErrorCode {
    FileInvalidType = "file-invalid-type",
    FileTooLarge = "file-too-large",
    FileTooSmall = "file-too-small",
    TooManyFiles = "too-many-files",
}

type PropTypes = "multiple" | "onDragEnter" | "onDragOver" | "onDragLeave";

export interface FileError {
    message: string;
    code: ErrorCode | string;
}

export interface FileRejection {
    file: File;
    errors: FileError[];
}

export interface DropzoneRef {
    open?: () => void;
}

export interface DropzoneRootProps extends HTMLAttributes<HTMLElement> {
    refKey?: string;

    [key: string]: any;
}

export interface DropzoneInputProps
    extends InputHTMLAttributes<HTMLInputElement> {
    refKey?: string;
}

export type DropzoneState = DropzoneRef & {
    isFocused: boolean;
    isDragActive: boolean;
    isDragAccept: boolean;
    isDragReject: boolean;
    isFileDialogActive: boolean;
    acceptedFiles: File[];
    fileRejections: FileRejection[];
    rootRef?: RefObject<HTMLElement>;
    inputRef?: RefObject<HTMLInputElement>;
    getRootProps?: <T extends DropzoneRootProps>(props?: T) => T;
    getInputProps?: <T extends DropzoneInputProps>(props?: T) => T;
    type?: "focus" | "blur" | "openDialog" | "closeDialog" | "setDraggedFiles" | "setFiles" | "reset";
};
type FileUploaderProps = Pick<HTMLProps<HTMLElement>, PropTypes> & {
    accept?: Accept;
    minSize?: number;
    maxSize?: number;
    maxFiles?: number;
    preventDropOnDocument?: boolean;
    noClick?: boolean;
    noKeyboard?: boolean;
    noDrag?: boolean;
    noDragEventsBubbling?: boolean;
    disabled?: boolean;
    onDrop?: <T extends File>(
        acceptedFiles: T[],
        fileRejections: FileRejection[],
        event: DropEvent
    ) => void;
    onDropAccepted?: <T extends File>(files: T[], event: DropEvent) => void;
    onDropRejected?: (fileRejections: FileRejection[], event: DropEvent) => void;
    getFilesFromEvent?: (
        event: DropEvent
    ) => Promise<Array<File | DataTransferItem>>;
    onFileDialogCancel?: () => void;
    onFileDialogOpen?: () => void;
    onError?: (err: Error) => void;
    validator?: <T extends File>(file: T) => FileError | FileError[] | null;
    autoFocus?: boolean;
};