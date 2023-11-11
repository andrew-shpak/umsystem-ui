import {Switch} from '@headlessui/react'
import type {ReactNode} from 'react';

export type SwitchFieldProps = {
    label?: ReactNode
    disabled?: boolean
    checked?: boolean;
    defaultChecked?: boolean;
    onChange?(checked: boolean): void;
    name?: string;
    value?: string;
    form?: string;
}

export default function SwitchField(props: SwitchFieldProps) {
    const {label, ...rest} = props
    return (
        <Switch
            {...rest}
            color="success">{label}</Switch>
    )
}
