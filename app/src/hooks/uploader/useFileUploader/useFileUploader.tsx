import {SyntheticEvent, useCallback, useMemo, useReducer, useRef} from "react";
import {fromEvent} from "file-selector";
import validator from "validator";
import {DropzoneState} from "./types";


const initialState: DropzoneState = {
    isFocused: false,
    isFileDialogActive: false,
    isDragActive: false,
    isDragAccept: false,
    isDragReject: false,
    acceptedFiles: [],
    fileRejections: []
}


export function useFileUploader(props: FileUploaderProps) {
    const {
        accept,
        disabled,
        getFilesFromEvent = fromEvent,
        maxSize = Infinity,
        minSize = 0,
        multiple = true,
        maxFiles = 0,
        onDragEnter,
        onDragLeave,
        onDragOver,
        onDrop,
        onDropAccepted,
        onDropRejected,
        onFileDialogCancel,
        onFileDialogOpen,
        autoFocus,
        preventDropOnDocument = true,
        noClick,
        noKeyboard,
        noDrag,
        noDragEventsBubbling,
        onError,
    } = props;
    const acceptAttr = useMemo(() => acceptPropAsAcceptAttr(accept), [accept]);
    const pickerTypes = useMemo(() => pickerOptionsFromAccept(accept), [accept]);

    const onFileDialogOpenCb = useMemo(
        () => (typeof onFileDialogOpen === "function" ? onFileDialogOpen : emptyFunction),
        [onFileDialogOpen]
    );
    const onFileDialogCancelCb = useMemo(
        () =>
            typeof onFileDialogCancel === "function" ? onFileDialogCancel : emptyFunction,
        [onFileDialogCancel]
    );

    const rootRef = useRef<HTMLElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const dragTargetsRef = useRef([]);

    const [state, dispatch] = useReducer(reducer, initialState);
    const {isFocused, isFileDialogActive} = state;
    const onDocumentDrop = (event: any) => {
        if (rootRef.current && rootRef.current.contains(event.target)) {
            // If we intercepted an event for our instance, let it propagate down to the instance's onDrop handler
            return;
        }
        event.preventDefault();
        dragTargetsRef.current = [];
    };
    const composeHandler = (fn: any) => {
        return disabled ? null : fn;
    };

    const composeKeyboardHandler = (fn: any) => {
        return noKeyboard ? null : composeHandler(fn);
    };

    const composeDragHandler = (fn: any) => {
        return noDrag ? null : composeHandler(fn);
    };
    const onClickCb = useCallback(() => {
        if (noClick) {
            return;
        }

        // In IE11/Edge the file-browser dialog is blocking, therefore, use setTimeout()
        // to ensure React can handle state changes
        // See: https://github.com/react-dropzone/react-dropzone/issues/450
        if (isIeOrEdge()) {
            setTimeout(openFileDialog, 0);
        } else {
            openFileDialog();
        }
    }, [noClick, openFileDialog]);
    const setFiles = useCallback(
        (files: (File | DataTransferItem)[], event) => {
            const acceptedFiles: File | DataTransferItem[] = [];
            const fileRejections: FileRejection[] = [];

            files.forEach((file: any) => {
                const [accepted, acceptError] = fileAccepted(file, acceptAttr);
                const [sizeMatch, sizeError] = fileMatchSize(file, minSize, maxSize);
                const customErrors = props?.validator ? props?.validator(file) : null;

                if (accepted && sizeMatch && !customErrors) {
                    acceptedFiles.push(file);
                } else {
                    let errors = [acceptError, sizeError];

                    if (customErrors) {
                        errors = errors.concat(customErrors);
                    }

                    fileRejections.push({file, errors: errors.filter((e) => e)});
                }
            });

            if (
                (!multiple && acceptedFiles.length > 1) ||
                (multiple && maxFiles >= 1 && acceptedFiles.length > maxFiles)
            ) {
                // Reject everything and empty accepted files
                acceptedFiles.forEach((file) => {
                    fileRejections.push({file, errors: [TOO_MANY_FILES_REJECTION]});
                });
                acceptedFiles.splice(0);
            }

            dispatch({
                acceptedFiles,
                fileRejections,
                type: "setFiles",
            } as DropzoneState);

            if (onDrop) {
                onDrop(acceptedFiles, fileRejections, event);
            }

            if (fileRejections.length > 0 && onDropRejected) {
                onDropRejected(fileRejections, event);
            }

            if (acceptedFiles.length > 0 && onDropAccepted) {
                onDropAccepted(acceptedFiles, event);
            }
        },
        [
            dispatch,
            multiple,
            acceptAttr,
            minSize,
            maxSize,
            maxFiles,
            onDrop,
            onDropAccepted,
            onDropRejected,
            validator,
        ]
    );

    const onErrCb = useCallback(
        (e: Error) => {
            if (onError) {
                onError(e);
            } else {
                // Let the user know something's gone wrong if they haven't provided the onError cb.
                console.error(e);
            }
        },
        [onError]
    );
    // Cb to open the file dialog when SPACE/ENTER occurs on the dropzone
    const onKeyDownCb = useCallback(
        (event) => {
            // Ignore keyboard events bubbling up the DOM tree
            if (!rootRef.current || !rootRef.current.isEqualNode(event.target)) {
                return;
            }

            if (
                event.key === " " ||
                event.key === "Enter" ||
                event.keyCode === 32 ||
                event.keyCode === 13
            ) {
                event.preventDefault();
                openFileDialog();
            }
        },
        [rootRef, openFileDialog]
    );

    // Update focus state for the dropzone
    const onFocusCb = useCallback(() => {
        dispatch({type: "focus"} as DropzoneState);
    }, []);
    const onBlurCb = useCallback(() => {
        dispatch({type: "blur"} as DropzoneState);
    }, []);

    const onDragEnterCb = useCallback(
        (event) => {
            event.preventDefault();
            // Persist here because we need the event later after getFilesFromEvent() is done
            event.persist();
            stopPropagation(event);

            dragTargetsRef.current = [...dragTargetsRef.current, event.target];

            if (isEvtWithFiles(event)) {
                Promise.resolve(getFilesFromEvent(event))
                    .then((files) => {
                        if (isPropagationStopped(event) && !noDragEventsBubbling) {
                            return;
                        }

                        const fileCount = files.length;
                        const isDragAccept =
                            fileCount > 0 &&
                            allFilesAccepted({
                                files,
                                accept: acceptAttr,
                                minSize,
                                maxSize,
                                multiple,
                                maxFiles,
                                validator,
                            });
                        const isDragReject = fileCount > 0 && !isDragAccept;

                        dispatch({
                            isDragAccept,
                            isDragReject,
                            isDragActive: true,
                            type: "setDraggedFiles",
                        });

                        if (onDragEnter) {
                            onDragEnter(event);
                        }
                    })
                    .catch((e) => onErrCb(e));
            }
        },
        [
            getFilesFromEvent,
            onDragEnter,
            onErrCb,
            noDragEventsBubbling,
            acceptAttr,
            minSize,
            maxSize,
            multiple,
            maxFiles,
            validator,
        ]
    );

    const onDragOverCb = useCallback(
        (event) => {
            event.preventDefault();
            event.persist();
            stopPropagation(event);

            const hasFiles = isEvtWithFiles(event);
            if (hasFiles && event.dataTransfer) {
                try {
                    event.dataTransfer.dropEffect = "copy";
                } catch {
                } /* eslint-disable-line no-empty */
            }

            if (hasFiles && onDragOver) {
                onDragOver(event);
            }

            return false;
        },
        [onDragOver, noDragEventsBubbling]
    );

    const onDragLeaveCb = useCallback(
        (event: any) => {
            event.preventDefault();
            event.persist();
            stopPropagation(event);

            // Only deactivate once the dropzone and all children have been left
            const targets: any = dragTargetsRef.current.filter(
                (target) => rootRef.current && rootRef.current.contains(target)
            );
            // Make sure to remove a target present multiple times only once
            // (Firefox may fire dragenter/dragleave multiple times on the same element)
            const targetIdx = targets.indexOf(event.target);
            if (targetIdx !== -1) {
                targets.splice(targetIdx, 1);
            }
            dragTargetsRef.current = targets;
            if (targets.length > 0) {
                return;
            }

            dispatch({
                type: "setDraggedFiles",
                isDragActive: false,
                isDragAccept: false,
                isDragReject: false,
            } as DropzoneState);

            if (isEvtWithFiles(event) && onDragLeave) {
                onDragLeave(event);
            }
        },
        [rootRef, onDragLeave, noDragEventsBubbling]
    );

    // Fn for opening the file dialog programmatically
    const openFileDialog = useCallback(() => {
        // No point to use FS access APIs if context is not secure
        // https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts#feature_detection
        // if (fsAccessApiWorksRef.current) {
        //     dispatch({ type: "openDialog" });
        //     onFileDialogOpenCb();
        //     // https://developer.mozilla.org/en-US/docs/Web/API/window/showOpenFilePicker
        //     const opts = {
        //         multiple,
        //         types: pickerTypes,
        //     };
        //     window
        //         .showOpenFilePicker(opts)
        //         .then((handles) => getFilesFromEvent(handles))
        //         .then((files) => {
        //             setFiles(files, null);
        //             dispatch({ type: "closeDialog" } as DropzoneState);
        //         })
        //         .catch((e) => {
        //             // AbortError means the user canceled
        //             if (isAbort(e)) {
        //                 onFileDialogCancelCb(e);
        //                 dispatch({ type: "closeDialog" });
        //             } else if (isSecurityError(e)) {
        //                 fsAccessApiWorksRef.current = false;
        //                 // CORS, so cannot use this API
        //                 // Try using the input
        //                 if (inputRef.current) {
        //                     inputRef.current.value = null;
        //                     inputRef.current.click();
        //                 } else {
        //                     onErrCb(
        //                         new Error(
        //                             "Cannot open the file picker because the https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API is not supported and no <input> was provided."
        //                         )
        //                     );
        //                 }
        //             } else {
        //                 onErrCb(e);
        //             }
        //         });
        //     return;
        // }

        if (inputRef.current) {
            dispatch({type: "openDialog"} as DropzoneState);
            onFileDialogOpenCb();
            inputRef.current.value = '';
            inputRef.current.click();
        }
    }, [
        dispatch,
        onFileDialogOpenCb,
        onFileDialogCancelCb,
        // useFsAccessApi,
        setFiles,
        onErrCb,
        pickerTypes,
        multiple,
    ]);
    const stopPropagation = (event: SyntheticEvent) => {
        if (noDragEventsBubbling) {
            event.stopPropagation();
        }
    };
    const onDropCb = useCallback(
        (event: any) => {
            event.preventDefault();
            // Persist here because we need the event later after getFilesFromEvent() is done
            event.persist();
            stopPropagation(event);

            dragTargetsRef.current = [];

            if (isEvtWithFiles(event)) {
                Promise.resolve(getFilesFromEvent(event))
                    .then((files) => {
                        if (isPropagationStopped(event) && !noDragEventsBubbling) {
                            return;
                        }
                        setFiles(files, event);
                    })
                    .catch((e) => onErrCb(e));
            }
            dispatch({type: "reset"} as DropzoneState);
        },
        [getFilesFromEvent, setFiles, onErrCb, noDragEventsBubbling]
    );
    const onInputElementClick = useCallback((event: SyntheticEvent<HTMLInputElement>) => {
        event.stopPropagation();
    }, []);
    const getInputProps = useMemo(
        () =>
            ({refKey = "ref", onChange, onClick, ...rest} = {}) => {
                const inputProps = {
                    accept: acceptAttr,
                    multiple,
                    type: "file",
                    style: {display: "none"},
                    onChange: composeHandler(composeEventHandlers(onChange, onDropCb)),
                    onClick: composeHandler(
                        composeEventHandlers(onClick, onInputElementClick)
                    ),
                    tabIndex: -1,
                    [refKey]: inputRef,
                };

                return {
                    ...inputProps,
                    ...rest,
                };
            },
        [acceptAttr, multiple, composeHandler, onDropCb, onInputElementClick]
    );
    const getRootProps = useMemo(
        () =>
            ({
                 refKey = "ref",
                 role,
                 onKeyDown,
                 onFocus,
                 onBlur,
                 onClick,
                 onDragEnter,
                 onDragOver,
                 onDragLeave,
                 onDrop,
                 ...rest
             } = {}) => ({
                onKeyDown: composeKeyboardHandler(
                    composeEventHandlers(onKeyDown, onKeyDownCb)
                ),
                onFocus: composeKeyboardHandler(
                    composeEventHandlers(onFocus, onFocusCb)
                ),
                onBlur: composeKeyboardHandler(composeEventHandlers(onBlur, onBlurCb)),
                onClick: composeHandler(composeEventHandlers(onClick, onClickCb)),
                onDragEnter: composeDragHandler(
                    composeEventHandlers(onDragEnter, onDragEnterCb)
                ),
                onDragOver: composeDragHandler(
                    composeEventHandlers(onDragOver, onDragOverCb)
                ),
                onDragLeave: composeDragHandler(
                    composeEventHandlers(onDragLeave, onDragLeaveCb)
                ),
                onDrop: composeDragHandler(composeEventHandlers(onDrop, onDropCb)),
                role: typeof role === "string" && role !== "" ? role : "presentation",
                [refKey]: rootRef,
                ...(!disabled && !noKeyboard ? {tabIndex: 0} : {}),
                ...rest,
            }),
        [composeKeyboardHandler,
            onKeyDownCb, onFocusCb, onBlurCb,
            composeHandler, onClickCb,
            composeDragHandler, onDragEnterCb,
            onDragOverCb, onDragLeaveCb,
            onDropCb,
            disabled,
            noKeyboard]
    );
    return {
        ...state,
        isFocused: isFocused && !disabled,
        getRootProps,
        getInputProps,
        rootRef,
        inputRef,
        open: composeHandler(openFileDialog)
    };

}


function reducer(state: DropzoneState, action: DropzoneState) {
    /* istanbul ignore next */
    switch (action.type) {
        case "focus":
            return {
                ...state,
                isFocused: true,
            };
        case "blur":
            return {
                ...state,
                isFocused: false,
            };
        case "openDialog":
            return {
                ...initialState,
                isFileDialogActive: true,
            };
        case "closeDialog":
            return {
                ...state,
                isFileDialogActive: false,
            };
        case "setDraggedFiles":
            return {
                ...state,
                isDragActive: action.isDragActive,
                isDragAccept: action.isDragAccept,
                isDragReject: action.isDragReject,
            };
        case "setFiles":
            return {
                ...state,
                acceptedFiles: action.acceptedFiles,
                fileRejections: action.fileRejections,
            };
        case "reset":
            return {
                ...initialState,
            };
        default:
            return state;
    }
}
