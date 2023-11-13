import type {InputHTMLAttributes, ReactNode} from 'react';
import {useState} from 'react'
import {Input} from "@nextui-org/input";
import {useIMask} from 'react-imask'
import type {FactoryOpts} from "imask";

export type DateFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>,
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
    errorMessage?: string
    defaultValue?: string
    helperText?: ReactNode
    onClear?: () => void
    isClearable?: boolean
    label: ReactNode
    onSubmit?: (value: Date | null) => void
    onChange?: (value: Date | null) => void
    fromDate?: Date
    toDate?: Date
}

export default function DateField(props: DateFieldProps) {
    const {
        fullWidth = true,
        helperText,
        onChange,
        className: inputClassName = '',
        onClear,
        isClearable = true,
        ...rest
    } = props
    const [, setInputValue] = useState<string | undefined>(
        props.defaultValue
    )
    const [opts] = useState({mask: Date, radix: '.'})
    const {ref} = useIMask<HTMLInputElement, FactoryOpts>(opts, {
        onAccept: newValue => setInputValue(newValue)
    })

    return (
        <Input
            {...rest}
            ref={ref}
            type="text"
            variant="faded"
            radius="sm"
            isInvalid={!!rest.errorMessage}
            description={helperText}
            isClearable={isClearable}
            className={inputClassName}
            fullWidth={fullWidth}
            isRequired={props.required}
            onClear={() => {
                if (onClear) onClear();
                setInputValue('');
            }}
        />
    )
}
