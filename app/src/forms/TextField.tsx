import type {InputHTMLAttributes, ReactNode} from 'react';
import {useRef, useState} from "react";
import {Input} from "@nextui-org/input";
import {useInputEvent} from "@conform-to/react";

type TextFieldParams = Omit<InputHTMLAttributes<HTMLInputElement>,
    "size"
    | "value"
    | "color"
    | "onFocus"
    | "onBlur"
    | "isInvalid"
    | "errorMessage"
    | "onClear"
> & {
    fullWidth?: boolean
    helperText?: ReactNode
    errorMessage?: string
    defaultValue?: string
    onClear?: () => void
    isClearable?: boolean
    label: ReactNode
}

export default function TextField(props: TextFieldParams) {
    const {
        fullWidth = true,
        helperText,
        onChange,
        className: inputClassName = '',
        onClear,
        isClearable = true,
        ...rest
    } = props
    const [value, setValue] = useState<string | null | undefined>(rest?.defaultValue );
    return (
            <Input
                {...rest}
                type="text"
                variant="faded"
                radius="sm"
                isInvalid={!!rest.errorMessage}
                description={helperText}
                isClearable={isClearable}
                isDisabled={!!rest.disabled}
                className={inputClassName}
                onClear={() => {
                    if (onClear) onClear();
                    setValue('')
                }}
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
