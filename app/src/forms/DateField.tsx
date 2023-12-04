import {useRef, useState} from 'react'
import type {InputProps} from "@nextui-org/react";
import {Input} from "@nextui-org/react";
import {useIMask} from 'react-imask'
import type {FactoryOpts} from "imask";
import type {Field} from "@conform-to/react";
import {conform, useField, useInputEvent} from "@conform-to/react";
import {convertToISOString} from "~/src/constants";

export type DateFieldProps = InputProps & {
    onClear?: () => void
    onSubmit?: (value: Date | null) => void
    fromDate?: Date
    toDate?: Date
} & Field<string>

export default function DateField(props: DateFieldProps) {
    const {
        fullWidth = true,
        onChange,
        onClear,
        isClearable = true,
        name,
        formId,
        ...rest
    } = props
    const field = useField({name, formId});
    const fieldProps = conform.input(field);
    const [inputValue, setInputValue] = useState<string | undefined>(
        fieldProps.defaultValue ?? ''
    )
    const [opts] = useState({mask: Date, radix: '.'})
    const {ref} = useIMask<HTMLInputElement, FactoryOpts>(opts, {
        onAccept: newValue => setInputValue(newValue)
    })
    const shadowInputRef = useRef<HTMLInputElement>(null);
    const control = useInputEvent({
        ref: shadowInputRef,
        onReset: () => setInputValue(fieldProps?.defaultValue ?? ''),
    });
    return (
        <>
            <input ref={shadowInputRef}
                   type="hidden"
                   {...fieldProps}
                   value={inputValue ? convertToISOString(inputValue) : ''}
            />
            <Input
                {...rest}
                {...control}
                ref={ref}
                type="text"
                variant="faded"
                radius="sm"
                errorMessage={field.errors?.length ? field.errors[0] : undefined}
                isInvalid={!!field.errors}
                isClearable={isClearable}
                isDisabled={!!rest.disabled}
                fullWidth={fullWidth}
                isRequired={fieldProps.required}
                onClear={() => {
                    if (onClear) onClear();
                    setInputValue('');
                    control.change('');
                }}
                value={inputValue}
                onChange={event => {
                    if (onChange) onChange(event);
                    setInputValue(event.target.value);
                    control.change(event);
                }}
            />
        </>
    )
}
