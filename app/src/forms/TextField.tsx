import type {ReactNode} from 'react';
import {useState} from "react";
import {Input} from "@nextui-org/input";
import type {InputProps} from '@nextui-org/react';
import type { FieldConfig} from "@conform-to/react";
import {conform} from "@conform-to/react";

type TextFieldParams = InputProps & {
    label: ReactNode
    config: FieldConfig<string>
}

export default function TextField(props: TextFieldParams) {
    const {
        fullWidth = true,
        onChange,
        onClear,
        isClearable = true,
        config,
        ...rest
    } = props
    const fieldProps = conform.input(config);
    const [value, setValue] = useState<string | null | undefined>(config?.defaultValue);
    return (
        <Input
            {...rest}
            {...fieldProps}
            type="text"
            variant="faded"
            radius="sm"
            erorMessage={config.error}
            isInvalid={!!config.error}
            isClearable={isClearable}
            isDisabled={!!rest.disabled}
            errorMessage={config.error}
            onClear={() => {
                if (onClear) onClear();
                setValue('')
            }}
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
