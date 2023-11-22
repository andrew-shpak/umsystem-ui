import {useRef, type HTMLAttributes, type HTMLProps, type InputHTMLAttributes, type RefObject, useMemo } from "react";
import type {DropEvent} from "@react-types/shared";
import { fromEvent } from "file-selector";
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
    open: () => void;
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
    rootRef: RefObject<HTMLElement>;
    inputRef: RefObject<HTMLInputElement>;
    getRootProps: <T extends DropzoneRootProps>(props?: T) => T;
    getInputProps: <T extends DropzoneInputProps>(props?: T) => T;
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
export function isMIMEType(v:string) {
    return (
        v === "audio/*" ||
        v === "video/*" ||
        v === "image/*" ||
        v === "text/*" ||
        /\w+\/[-+.\w]+/g.test(v)
    );
}
export function useFileUploader(props: FileUploaderProps) {
    const {
        accept,
        disabled,
        getFilesFromEvent = fromEvent,
        maxSize=Infinity,
        minSize = 0,
        multiple = true,
        maxFiles,
        onDragEnter,
        onDragLeave,
        onDragOver,
        onDrop,
        onDropAccepted,
        onDropRejected,
        onFileDialogCancel,
        onFileDialogOpen,
        useFsAccessApi,
        autoFocus,
        preventDropOnDocument = true,
        noClick,
        noKeyboard,
        noDrag,
        noDragEventsBubbling,
        onError,
        validator,
    } = props;
    const rootRef = useRef(null);

    const inputRef = useRef(null);

    // const acceptAttr = useMemo(() => acceptPropAsAcceptAttr(accept), [accept]);
    // const pickerTypes = useMemo(() => pickerOptionsFromAccept(accept), [accept]);

    const getInputProps = useMemo(
        () =>
            ({ refKey = "ref", onChange, onClick, ...rest } = {}) => {
                const inputProps = {
                    // accept: acceptAttr,
                    multiple,
                    type: "file",
                    style: { display: "none" },
                    // onChange: composeHandler(composeEventHandlers(onChange, onDropCb)),
                    // onClick: composeHandler(
                    //     composeEventHandlers(onClick, onInputElementClick)
                    // ),
                    tabIndex: -1,
                    [refKey]: inputRef,
                };

                return {
                    ...inputProps,
                    ...rest,
                };
            },
        [inputRef, accept, multiple, onDropCb, disabled]
    );

    return {
        // gisFocused: isFocused && !disabled,
        getRootProps,
        getInputProps,
        rootRef,
        inputRef,
    };

}

