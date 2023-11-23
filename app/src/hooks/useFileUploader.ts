import * as React from 'react';
import {useDragging} from './useDragging';

type FileUploaderProps = {
    name: string;
    types?: Array<string>;
    children?: JSX.Element;
    maxSize?: number;
    minSize?: number;
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
                                    maxSize,
                                    minSize,
                                    fileOrFiles,
                                    onSizeError,
                                    onTypeError,
                                    onSelect,
                                    onDrop,
                                    multiple,
                                    required,
                                    disabled,
                                    onDraggingStateChange,
                                }: FileUploaderProps) {

    const containerRef = React.useRef<HTMLDivElement>(null);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [uploaded, setUploaded] = React.useState(false);
    const [files, setFile] = React.useState<Array<File> | File | null>(null);
    const [error, setError] = React.useState(false);

    const validateFile = (file: File) => {
        if (types && !checkType(file, types)) {
            // types included and type not in them
            setError(true);
            if (onTypeError) onTypeError('File type is not supported');
            return false;
        }
        if (maxSize && getFileSizeMB(file.size) > maxSize) {
            setError(true);
            if (onSizeError) onSizeError('File size is too big');
            return false;
        }
        if (minSize && getFileSizeMB(file.size) < minSize) {
            setError(true);
            if (onSizeError) onSizeError('File size is too small');
            return false;
        }
        return true;
    };

    const handleChanges = (files: File | Array<File>): boolean => {
        let checkError = false;
        if (files) {
            if (files instanceof File) {
                checkError = !validateFile(files);
            } else {
                for (let i = 0; i < files.length; i++) {
                    const file = files[i];
                    checkError = !validateFile(file) || checkError;
                }
            }
            if (checkError) return false;
            if (handleChange) handleChange(files);
            setFile(files);

            setUploaded(true);
            setError(false);
            return true;
        }
        return false;
    };

    const blockEvent = (ev: any) => {
        ev.preventDefault();
        ev.stopPropagation();
    };
    const handleClick = (ev: any) => {
        ev.stopPropagation();
        // eslint-disable-next-line no-param-reassign
        if (inputRef && inputRef.current) {
            inputRef.current.value = '';
            inputRef.current.click();
        }
    };

    const handleInputChange = (ev: any) => {
        const allFiles = ev.target.files;
        const files = multiple ? allFiles : allFiles[0];
        const success = handleChanges(files);
        if (onSelect && success) onSelect(files);
    };
    const dragging = useDragging({
        labelRef:containerRef,
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
            setUploaded(true);
            setFile(fileOrFiles);
        } else {
            if (inputRef.current) inputRef.current.value = '';
            setUploaded(false);
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
        ref:containerRef
    };
    return {
        inputProps,
        containerProps,
        files
    }
}