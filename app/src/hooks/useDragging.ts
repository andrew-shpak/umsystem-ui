import * as React from 'react';

let draggingCount = 0;
type Params = {
    containerRef: any;
    inputRef: React.RefObject<HTMLInputElement>;
    multiple?: boolean | false;
    handleChanges: (arg: Array<File>) => boolean;
    onDrop?: (arg: Array<File>) => void;
};
export  function useDragging({
                                        containerRef,
                                        inputRef,
                                        multiple,
                                        handleChanges,
                                        onDrop
                                    }: Params): boolean {
    const [dragging, setDragging] = React.useState(false);
    const handleClick = React.useCallback(() => {
        inputRef.current?.click();
    }, [inputRef]);

    const handleDragIn = React.useCallback((ev:DragEvent) => {
        ev.preventDefault();
        ev.stopPropagation();
        draggingCount++;
        if (ev.dataTransfer?.items && ev.dataTransfer.items.length !== 0) {
            setDragging(true);
        }
    }, []);
    const handleDragOut = React.useCallback((ev:React.SyntheticEvent) => {
        ev.preventDefault();
        ev.stopPropagation();
        draggingCount--;
        if (draggingCount > 0) return;
        setDragging(false);
    }, []);
    const handleDrag = React.useCallback((ev:React.SyntheticEvent) => {
        ev.preventDefault();
        ev.stopPropagation();
    }, []);
    const handleDrop = React.useCallback(
        (ev:DragEvent) => {
            ev.preventDefault();
            ev.stopPropagation();
            setDragging(false);
            draggingCount = 0;

            const eventFiles = ev.dataTransfer?.files;
            if (eventFiles && eventFiles.length > 0) {
                const files = multiple ? Array.from(eventFiles) : [eventFiles[0]];
                const success = handleChanges(files);
                if (onDrop && success) onDrop(files);
            }
        },
        [handleChanges]
    );
    React.useEffect(() => {
        const ele = containerRef.current;
        ele.addEventListener('click', handleClick);
        ele.addEventListener('dragenter', handleDragIn);
        ele.addEventListener('dragleave', handleDragOut);
        ele.addEventListener('dragover', handleDrag);
        ele.addEventListener('drop', handleDrop);
        return () => {
            ele.removeEventListener('click', handleClick);
            ele.removeEventListener('dragenter', handleDragIn);
            ele.removeEventListener('dragleave', handleDragOut);
            ele.removeEventListener('dragover', handleDrag);
            ele.removeEventListener('drop', handleDrop);
        };
    }, [
        handleClick,
        handleDragIn,
        handleDragOut,
        handleDrag,
        handleDrop,
        containerRef
    ]);

    return dragging;
}