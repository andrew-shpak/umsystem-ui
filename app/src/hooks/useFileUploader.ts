import * as React from 'react';
import {useDragging} from './useDragging';

type FileUploaderProps = {
    name: string;
    types?: Array<string>;
    fileOrFiles?: Array<File> | File | null;
    disabled?: boolean | false;
    label?: string | undefined;
    multiple?: boolean | false;
    required?: boolean | false;
    onSizeError?: (arg0: string) => void;
    onTypeError?: (arg0: string) => void;
    onDrop?: (arg0: File | Array<File>) => void;
    onSelect?: (arg0: File | Array<File>) => void;
    handleChange?: (arg0:  Array<File> | File) => void;
    onDraggingStateChange?: (dragging: boolean) => void;
};
export const getFileSizeMB = (size: number): number => {
    return size / 1000 / 1000;
};

export const checkType = (file: File, types: Array<string>): boolean => {
    const extension: string = file.name.split('.').pop() as string;
    const loweredTypes = types.map((type) => type.toLowerCase());
    return loweredTypes.includes(extension.toLowerCase());
};

export const acceptedExt = (types: Array<string> | undefined) => {
    if (types === undefined) return '';
    return types.map((type) => `.${type.toLowerCase()}`).join(',');
};

export function useFileUploader({
                                    name,
                                    types,
                                    handleChange,
                                    fileOrFiles,
                                    onSelect,
                                    onDrop,
                                    multiple,
                                    required,
                                    disabled,
                                    onDraggingStateChange,
                                }: FileUploaderProps) {

    const containerRef = React.useRef<HTMLDivElement>(null);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [files, setFile] = React.useState<Array<File> | File | null>(null);


    const handleChanges = (files: File | Array<File>): boolean => {
        if (files) {
            if (handleChange) handleChange(files);
            setFile(files);
            return true;
        }
        return false;
    };


    const handleInputChange = (ev: any) => {
        const allFiles = ev.target.files;
        const files = multiple ? allFiles : allFiles[0];
        const success = handleChanges(files);
        if (onSelect && success) onSelect(files);
    };
    const dragging = useDragging({
        containerRef:containerRef,
        inputRef,
        multiple,
        handleChanges,
        onDrop
    });

    React.useEffect(() => {
        onDraggingStateChange?.(dragging);
    }, [dragging, onDraggingStateChange]);

    React.useEffect(() => {
        if (fileOrFiles) {
            setFile(fileOrFiles);
        } else {
            if (inputRef.current) inputRef.current.value = '';
            setFile(null);
        }
    }, [fileOrFiles]);
    const inputProps = {
        name,
        disabled,
        type: 'file',
        multiple,
        required,
        onChange: handleInputChange,
        ref: inputRef,
        accept: acceptedExt(types),
        style: {display: 'none'},
    };
    const containerProps = {
        ref:containerRef,
    };
    return {
        inputProps,
        containerProps,
        files,
        isDragging:dragging,
    }
}