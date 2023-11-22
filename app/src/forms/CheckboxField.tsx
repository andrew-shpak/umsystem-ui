import {Checkbox, CheckboxProps} from '@nextui-org/react'
import type {ReactNode} from "react";
import {useRef} from "react";
import type {FieldConfig} from "@conform-to/react";
import {conform, useInputEvent} from "@conform-to/react";

type CheckboxFieldProps = CheckboxProps & {
    label?: ReactNode
    config: FieldConfig<string>
}

export default function CheckboxField(props: CheckboxFieldProps) {
    const {
        label,
        color = "success",
        config,
        ...rest
    } = props;
    const shadowInputRef = useRef<HTMLInputElement>(null);
    const control = useInputEvent({
        ref: shadowInputRef,
    });
    return (
        <>
            <input ref={shadowInputRef}
                   {...conform.input(config, {hidden: true, type: 'checkbox'})}/>
            <Checkbox
                {...rest}
                radius="sm"
                isDisabled={rest.disabled}
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
