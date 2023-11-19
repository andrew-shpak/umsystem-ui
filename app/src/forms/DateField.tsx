import type {InputHTMLAttributes, ReactNode} from 'react';
import {useRef, useState} from 'react'
import {Input} from "@nextui-org/input";
import {useIMask} from 'react-imask'
import type {FactoryOpts} from "imask";
import {conform, FieldConfig, useInputEvent} from "@conform-to/react";

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
    config: FieldConfig<string>
}

export default function DateField(props: DateFieldProps) {
    const {
        fullWidth = true,
        helperText,
        onChange,
        className: inputClassName = '',
        onClear,
        isClearable = true,
        config,
        ...rest
    } = props

    const [inputValue, setInputValue] = useState<string | undefined>(
        props.defaultValue ?? ''
    )
    const [opts] = useState({mask: Date, radix: '.'})
    const {ref} = useIMask<HTMLInputElement, FactoryOpts>(opts, {
        onAccept: newValue => setInputValue(newValue)
    })
    const shadowInputRef = useRef<HTMLInputElement>(null);
    const control = useInputEvent({
        ref: shadowInputRef,
        onReset: () => setInputValue(rest?.defaultValue ?? ''),
    });
    return (
        <>
            <input ref={shadowInputRef}
                   {...conform.input(config, {hidden: true})}/>
            <Input
                {...rest}
                ref={ref}
                type="text"
                variant="faded"
                radius="sm"
                isInvalid={!!rest.errorMessage}
                description={helperText}
                isClearable={isClearable}
                isDisabled={!!rest.disabled}
                className={inputClassName}
                fullWidth={fullWidth}
                isRequired={props.required}
                onClear={() => {
                    if (onClear) onClear();
                    setInputValue('');
                }}
                value={inputValue}
                onBlur={control.blur}
                onFocus={control.focus}
                onChange={event => {
                    if (onChange) onChange(event);
                    setInputValue(event.target.value);
                }}
            />
        </>
    )
}
