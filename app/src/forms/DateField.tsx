import type {InputHTMLAttributes, ReactNode} from 'react';
import {useRef, useState} from 'react'
import {Input} from "@nextui-org/input";
import {useIMask} from 'react-imask'
import type {FactoryOpts} from "imask";
import {useInputEvent} from "@conform-to/react";
import {convertToISOString} from "~/src/constants";

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
    const [inputValue, setInputValue] = useState<string| undefined>(
        props.defaultValue
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
console.log(inputValue)
    return (
        <>
            <input ref={shadowInputRef}
                   type="hidden"
                   name={rest.name}
                   value={convertToISOString(inputValue?.toString() ?? '')}/>
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
            value={inputValue?.toString() ?? ''}
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
