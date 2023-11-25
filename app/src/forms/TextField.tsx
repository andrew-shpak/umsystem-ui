import type {ReactNode} from 'react';
import {useState} from "react";
import {Input} from "@nextui-org/input";
import type {InputProps} from '@nextui-org/react';
import type {Field, FieldConfig} from "@conform-to/react";
import {conform, useField} from "@conform-to/react";

type TextFieldParams = InputProps & Field<string> & {
    label: ReactNode
}

export default function TextField(props: TextFieldParams) {
    const {
        fullWidth = true,
        onChange,
        onClear,
        isClearable = true,
        name,
        formId,
        ...rest
    } = props
    const field = useField({ name, formId });
    const fieldProps= conform.input(field);
    const [value, setValue] = useState<string | null | undefined>(fieldProps?.defaultValue);
    return (
        <Input
            {...rest}
            {...fieldProps}
            type="text"
            variant="faded"
            radius="sm"
            isInvalid={!!field.errors}
            isClearable={isClearable}
            isDisabled={!!rest.disabled}
            errorMessage={field.errors?.length ? field.errors[0] :undefined}
            onClear={() => {
                if (onClear) onClear();
                setValue('')
            }}
            fullWidth={fullWidth}
            isRequired={fieldProps.required}
            value={value?.toString() ?? ''}
            onChange={event => {
                if (onChange) onChange(event);
                setValue(event.target.value);
            }}
        />
    )
}
