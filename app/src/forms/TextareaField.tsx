import type {ReactNode} from 'react';
import {useState} from "react";
import {Textarea} from "@nextui-org/input";
import type {TextAreaProps} from '@nextui-org/react';
import type {FieldConfig} from "@conform-to/react";
import {conform} from "@conform-to/react";

type TextareaFieldParams = TextAreaProps & {
    onClear?: () => void
    label: ReactNode
    config: FieldConfig<string>
}

export default function TextareaField(props: TextareaFieldParams) {
    const {
        fullWidth = true,
        onChange,
        onClear,
        isMultiline = true,
        config,
        ...rest
    } = props

    const [value, setValue] = useState<string | null | undefined>(config?.defaultValue);
    const fieldProps = conform.input(config);
    return (
        <Textarea
            {...rest}
            {...fieldProps}
            type="text"
            variant="faded"
            radius="sm"
            errorMessage={config.error}
            isInvalid={!!config.error}
            isMultiline={isMultiline}
            onClear={() => {
                if (onClear) onClear();
                setValue('');
            }}
            isDisabled={!!rest.disabled}
            fullWidth={fullWidth}
            isRequired={config.required}
            value={value?.toString() ?? ''}
            onChange={event => {
                if (onChange) onChange(event);
                setValue(event.target.value);
            }}
        />
    )
}
