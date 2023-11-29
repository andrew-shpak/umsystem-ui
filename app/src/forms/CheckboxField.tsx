import type {CheckboxProps} from '@nextui-org/react';
import {Checkbox} from '@nextui-org/react'
import type {ReactNode} from "react";
import {useRef} from "react";
import type {Field} from "@conform-to/react";
import {conform, useField, useInputEvent} from "@conform-to/react";

type CheckboxFieldProps = Omit<CheckboxProps, "name" | "formId"> & Field<boolean> & {
    label?: ReactNode
}

export default function CheckboxField(props: CheckboxFieldProps) {
    const {
        label,
        color = "success",
        name,
        formId,
        ...rest
    } = props;
    const field = useField({name, formId});
    const fieldProps = conform.input(field);
    const shadowInputRef = useRef<HTMLInputElement>(null);
    const control = useInputEvent({
        ref: shadowInputRef,
    });
    return (
        <>
            <input ref={shadowInputRef}
                   type="hidden"
                   name={name}
                   value={fieldProps?.defaultValue ? 'on' : ''}
                   onChange={() => {
                   }}
            />
            <Checkbox
                {...rest}
                radius="sm"
                isDisabled={rest.disabled}
                isRequired={fieldProps.required}
                color={color}
                defaultSelected={Boolean(fieldProps.defaultValue)}
                onValueChange={(checked) => {
                    control.change(checked)
                    props.onValueChange?.(checked)
                }}
            >{label}</Checkbox>
        </>
    )
}
