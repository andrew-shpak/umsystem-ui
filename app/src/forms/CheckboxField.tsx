import type {CheckboxProps} from '@nextui-org/react';
import {Checkbox} from '@nextui-org/react'
import type {ReactNode} from "react";
import type { FieldConfig} from "@conform-to/react";
import {conform, useInputEvent} from "@conform-to/react";
import {useRef} from "react";

type CheckboxFieldProps = {
    label?: ReactNode
    config: FieldConfig<string>
    disabled?: boolean
    color?:"default" | "primary" | "secondary" | "success" | "warning" | "danger"
    onValueChange?: (checked: boolean) => void
}

export default function CheckboxField(props: CheckboxFieldProps) {
    const {
        label,
        color = "success",
        disabled,
        config,
    } = props;
    const shadowInputRef = useRef<HTMLInputElement>(null);
    const control = useInputEvent({
        ref: shadowInputRef,
    });
    console.log(config)
    return (
        <>
            <input ref={shadowInputRef}
                   {...conform.input(config, {hidden: true, type:'checkbox'})}/>
        <Checkbox
            radius="sm"
            isDisabled={disabled}
            disabled={disabled}
            isRequired={config.required}
            color={color}
            defaultSelected={Boolean(config.defaultValue)}
            onValueChange={(checked) => {
                control.change(checked)
                props.onValueChange?.(checked)
            }}
        >{label}</Checkbox>
        </>
    )
}
