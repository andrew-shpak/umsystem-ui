import type {InputHTMLAttributes, ReactNode} from 'react';
import {Textarea} from "@nextui-org/input";
import type {TextAreaProps} from '@nextui-org/react';

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
        ...rest
    } = props
    return (
        <Textarea
            {...rest}
            type="text"
            variant="faded"
            radius="sm"
            isInvalid={!!rest.errorMessage}
            description={helperText}
            className={inputClassName}
            onClear={onClear}
            fullWidth={fullWidth}
            isRequired={props.required}
        />
    )
}
