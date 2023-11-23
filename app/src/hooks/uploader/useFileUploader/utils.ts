import accepts from "attr-accept";
import type {SyntheticEvent} from "react";

export enum ErrorCode {
    FileInvalidType = "file-invalid-type",
    FileTooLarge = "file-too-large",
    FileTooSmall = "file-too-small",
    TooManyFiles = "too-many-files",
}

// Error codes
export const FILE_INVALID_TYPE = "file-invalid-type";
export const FILE_TOO_LARGE = "file-too-large";
export const FILE_TOO_SMALL = "file-too-small";
export const TOO_MANY_FILES = "too-many-files";

function isIe(userAgent: string) {
    return (
        userAgent.indexOf("MSIE") !== -1 || userAgent.indexOf("Trident/") !== -1
    );
}

function isEdge(userAgent: string) {
    return userAgent.indexOf("Edge/") !== -1;
}

export function isIeOrEdge(userAgent = window.navigator.userAgent) {
    return isIe(userAgent) || isEdge(userAgent);
}

// File Errors
export const getInvalidTypeRejectionErr = (accept) => {
    accept = Array.isArray(accept) && accept.length === 1 ? accept[0] : accept;
    const messageSuffix = Array.isArray(accept)
        ? `one of ${accept.join(", ")}`
        : accept;
    return {
        code: FILE_INVALID_TYPE,
        message: `File type must be ${messageSuffix}`,
    };
};

// Firefox versions prior to 53 return a bogus MIME type for every file drag, so dragovers with
// that MIME type will always be accepted
export function fileAccepted(file: File, accept: string) {
    const isAcceptable =
        file.type === "application/x-moz-file" || accepts(file, accept);
    return [
        isAcceptable,
        isAcceptable ? null : getInvalidTypeRejectionErr(accept),
    ];
}

export const getTooLargeRejectionErr = (maxSize: number) => {
    return {
        code: FILE_TOO_LARGE,
        message: `File is larger than ${maxSize} ${
            maxSize === 1 ? "byte" : "bytes"
        }`,
    };
};

export const getTooSmallRejectionErr = (minSize: number) => {
    return {
        code: FILE_TOO_SMALL,
        message: `File is smaller than ${minSize} ${
            minSize === 1 ? "byte" : "bytes"
        }`,
    };
};

export const TOO_MANY_FILES_REJECTION = {
    code: TOO_MANY_FILES,
    message: "Too many files",
};

export function fileMatchSize(file?: File, minSize?: number, maxSize?: number) {
    if (file?.size) {
        if (minSize && maxSize) {
            if (file.size > maxSize) return [false, getTooLargeRejectionErr(maxSize)];
            if (file.size < minSize) return [false, getTooSmallRejectionErr(minSize)];
        } else if (minSize && file.size < minSize)
            return [false, getTooSmallRejectionErr(minSize)];
        else if (maxSize && file.size > maxSize)
            return [false, getTooLargeRejectionErr(maxSize)];
    }
    return [true, null];
}

export function isPropagationStopped(event: SyntheticEvent) {
    if (typeof event.isPropagationStopped === "function") {
        return event.isPropagationStopped();
    }
    return false;
}

export function composeEventHandlers(...fns: any) {
    return (event: SyntheticEvent, ...args: any[]) =>
        fns.some((fn: any) => {
            if (!isPropagationStopped(event) && fn) {
                fn(event, ...args);
            }
            return isPropagationStopped(event);
        });
}

export function isEvtWithFiles(event: any) {
    if (!event.dataTransfer) {
        return !!event.target && !!event.target.files;
    }
    // https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer/types
    // https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/Recommended_drag_types#file
    return Array.prototype.some.call(
        event.dataTransfer.types,
        (type) => type === "Files" || type === "application/x-moz-file"
    );
}