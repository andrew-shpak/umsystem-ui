import {InputHTMLAttributes, ReactNode, useRef, useState} from 'react'
import {Input} from "@nextui-org/input";
import {useIMask} from "react-imask";
import {FactoryOpts} from "imask";
import {useInputEvent} from "@conform-to/react";

type NumberFieldParams = Omit<InputHTMLAttributes<HTMLInputElement>,
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
    label?: string
    onClear?: () => void
    isClearable?: boolean
    mapToRadix?: string[]
}

export default function NumberField(props: NumberFieldParams) {
    const {
        fullWidth = true,
        helperText,
        className: inputClassName = '',
        onClear,
        isClearable = true,
        mapToRadix = [',', '.'],
        errorMessage,
        defaultValue,
        required,
        onChange,
        label,
        placeholder,
        disabled
    } = props
    const [value, setValue] = useState<string | null | undefined>(defaultValue?.toString() ?? null);

    const [opts] = useState<FactoryOpts>({
        mask: Number,
        mapToRadix,
        radix: '.',
        thousandsSeparator: ',',
    })
    const {ref} = useIMask<HTMLInputElement, FactoryOpts>(opts, {
        onAccept: newValue => setValue(newValue)
    })
    return (
            <Input
                ref={ref}
                type="text"
                variant="faded"
                radius="sm"
                isInvalid={!!errorMessage}
                description={helperText}
                isClearable={isClearable}
                isDisabled={disabled}
                className={inputClassName}
                onClear={() => {
                    if (onClear) onClear();
                    setValue('');
                }}
                fullWidth={fullWidth}
                isRequired={required}
                value={value?.toString() ?? ''}
                onChange={event => {
                    if (onChange) onChange(event);
                    setValue(event.target.value);
                }}
                required={required}
                label={label}
                placeholder={placeholder}
            />
    )
}
