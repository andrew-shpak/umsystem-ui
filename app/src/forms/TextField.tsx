import type {InputHTMLAttributes, ReactNode} from 'react';
import {Input} from "@nextui-org/input";

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
    return (
        <Input
            {...rest}
            type="text"
            variant="faded"
            radius="sm"
            isInvalid={!!rest.errorMessage}
            description={helperText}
            isClearable={isClearable}
            className={inputClassName}
            onClear={onClear}
            fullWidth={fullWidth}
            isRequired={props.required}
        />
    )
}
