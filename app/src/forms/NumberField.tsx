import {useState} from 'react'
import {Input} from "@nextui-org/input";
import {useIMask} from "react-imask";
import type {FactoryOpts} from "imask";
import type {InputProps} from "@nextui-org/react";
import type { FieldConfig} from '@conform-to/react';
import {conform} from '@conform-to/react';

type NumberFieldParams = InputProps & {
    mapToRadix?: string[]
    config: FieldConfig<string>
}

export default function NumberField(props: NumberFieldParams) {
    const {
        fullWidth = true,
        onClear,
        mapToRadix = [',', '.'],
        isClearable = true,
        config,
        ...rest
    } = props
    const fieldProps = conform.input(config);
    const [value, setValue] = useState<string | null | undefined>(config?.toString() ?? '');

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
            {...rest}
            {...fieldProps}
            ref={ref}
            type="text"
            variant="faded"
            radius="sm"
            errorMessage={config.error}
            isInvalid={!!config.error}
            isClearable={isClearable}
            isDisabled={rest.disabled}
            onClear={() => {
                if (onClear) onClear();
                setValue('');
            }}
            fullWidth={fullWidth}
            isRequired={config.required}
            value={value?.toString() ?? ''}
            onChange={event => {
                if (rest.onChange) rest?.onChange(event);
                setValue(event.target.value);
            }}
        />
    )
}
