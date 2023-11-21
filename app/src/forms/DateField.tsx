import type {InputHTMLAttributes, ReactNode} from 'react';
import {useRef, useState} from 'react'
import {Input} from "@nextui-org/input";
import {useIMask} from 'react-imask'
import type {FactoryOpts} from "imask";
import {conform, FieldConfig, useInputEvent} from "@conform-to/react";
import {InputProps} from "@nextui-org/react";

export type DateFieldProps =InputProps & {
    onClear?: () => void
    onSubmit?: (value: Date | null) => void
    fromDate?: Date
    toDate?: Date
    config: FieldConfig<string>
}

export default function DateField(props: DateFieldProps) {
    const {
        fullWidth = true,
        onChange,
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
                errorMessage={config.error}
                isInvalid={!!config.error}
                isClearable={isClearable}
                isDisabled={!!rest.disabled}
                fullWidth={fullWidth}
                isRequired={config.required}
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
