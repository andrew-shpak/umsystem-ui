import type {InputHTMLAttributes, ReactNode} from 'react';
import {useRef, useState} from "react";
import {Textarea} from "@nextui-org/input";
import type {TextAreaProps} from '@nextui-org/react';
import {useInputEvent} from "@conform-to/react";

type TextareaFieldParams = Omit<InputHTMLAttributes<HTMLInputElement>,
    "size"
    | "value"
    | "color"
    | "onFocus"
    | "onBlur"
    | "isInvalid"
    | "errorMessage"
    | "onClear"
> & TextAreaProps & {
    helperText?: ReactNode
    onClear?: () => void
    label: ReactNode
}

export default function TextareaField(props: TextareaFieldParams) {
    const {
        fullWidth = true,
        helperText,
        onChange,
        className: inputClassName = '',
        onClear,
        isMultiline= true,
        ...rest
    } = props
    const [value, setValue] = useState<string | null | undefined>(rest?.defaultValue);

    return (
            <Textarea
                {...rest}
                type="text"
                variant="faded"
                radius="sm"
                isInvalid={!!rest.errorMessage}
                description={helperText}
                className={inputClassName}
                isMultiline={isMultiline}
                onClear={() => {
                    if (onClear) onClear();
                    setValue('');
                }}
                isDisabled={!!rest.disabled}
                fullWidth={fullWidth}
                isRequired={props.required}
                value={value?.toString() ?? ''}
                onChange={event => {
                    if (onChange) onChange(event);
                    setValue(event.target.value);
                }}
            />
    )
}
