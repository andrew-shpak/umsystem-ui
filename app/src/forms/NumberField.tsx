import {useState} from 'react'
import {Input} from "@nextui-org/input";
import {useIMask} from "react-imask";
import type {FactoryOpts} from "imask";
import type {InputProps} from "@nextui-org/react";
import type {FieldConfig} from '@conform-to/react';
import {conform, Field, useField} from '@conform-to/react';

type NumberFieldParams = InputProps & Field<string>& {
    mapToRadix?: string[]
}

export default function NumberField(props: NumberFieldParams) {
    const {
        fullWidth = true,
        onClear,
        mapToRadix = [',', '.'],
        isClearable = true,
       name,
        formId,
        ...rest
    } = props
    const field = useField({ name, formId });
    const fieldProps= conform.input(field);
    const [value, setValue] = useState<string | null | undefined>(fieldProps?.toString() ?? '');

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
            errorMessage={field.errors?.length ? field.errors[0] :undefined}
             isInvalid={!!field.errors}
            isClearable={isClearable}
            isDisabled={rest.disabled}
            onClear={() => {
                if (onClear) onClear();
                setValue('');
            }}
            fullWidth={fullWidth}
            isRequired={fieldProps.required}
            value={value?.toString() ?? ''}
            onChange={event => {
                if (rest.onChange) rest?.onChange(event);
                setValue(event.target.value);
            }}
        />
    )
}
