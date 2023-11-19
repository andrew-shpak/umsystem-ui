import type {CheckboxProps} from '@nextui-org/react';
import {Checkbox} from '@nextui-org/react'
import type {ReactNode} from "react";

type CheckboxFieldProps = CheckboxProps & {
    label?: ReactNode
}

export default function CheckboxField(props: CheckboxFieldProps) {
    const {
        label,
        color = "success",
        name,
        required,
        disabled,
        defaultSelected
    } = props
    return (
        <Checkbox
            defaultSelected={defaultSelected}
            radius="sm"
            disabled={disabled}
            isDisabled={!!disabled}
            isRequired={required}
            required={required}
            name={name}
            color={color}
        >{label}</Checkbox>
    )
}
