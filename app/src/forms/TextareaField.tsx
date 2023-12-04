import type {ReactNode} from 'react';
import {useState} from "react";
import {Textarea} from "@nextui-org/react";
import type {TextAreaProps} from '@nextui-org/react';
import {conform, Field, useField} from "@conform-to/react";

type TextareaFieldParams = TextAreaProps & Field<string> & {
    onClear?: () => void
    label: ReactNode
}

export default function TextareaField(props: TextareaFieldParams) {
    const {
        fullWidth = true,
        onChange,
        onClear,
        isMultiline = true,
        name,
        formId,
        ...rest
    } = props
    const field = useField({name, formId});
    const fieldProps = conform.input(field);
    const [value, setValue] = useState<string | null | undefined>(fieldProps?.defaultValue);
    return (
        <Textarea
            {...rest}
            {...fieldProps}
            type="text"
            variant="faded"
            radius="sm"
            errorMessage={field.errors?.length ? field.errors[0] : undefined}
            isInvalid={!!field.errors}
            isMultiline={isMultiline}
            onClear={() => {
                if (onClear) onClear();
                setValue('');
            }}
            isDisabled={!!rest.disabled}
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
