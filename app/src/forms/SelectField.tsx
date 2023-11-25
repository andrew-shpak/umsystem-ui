import type {SelectProps} from "@nextui-org/react";
import {Select, SelectItem} from "@nextui-org/react"
import type {Field} from "@conform-to/react";
import {conform, useField, useInputEvent} from "@conform-to/react";
import {useRef, useState} from "react";
import type {Key} from "@react-types/shared";

type SelectFieldProps = {
    options: { label: string, value: string }[]
} & Field<string> & Omit<SelectProps, "children" | "selectedKeys" | "onSelectionChange">

export default function SelectField(props: SelectFieldProps) {
    const {options, name, formId, ...rest} = props
    const field = useField({name, formId});
    const fieldProps = conform.input(field);
    const [value, setValue] = useState<'all' | Iterable<Key>>(new Set(fieldProps.defaultValue ? [fieldProps.defaultValue] : []));
    const shadowInputRef = useRef<HTMLInputElement>(null);
    const control = useInputEvent({
        ref: shadowInputRef,
        onReset: () => setValue(fieldProps?.defaultValue ?? []),
    });
    return (
        <>
            <input ref={shadowInputRef}
                   type="hidden"
                   {...fieldProps}
            />
            <Select
                {...rest}
                {...control}
                variant="faded"
                radius="sm"
                isInvalid={!!field.errors}
                isDisabled={!!rest.disabled}
                isRequired={fieldProps.required}
                errorMessage={field.errors?.length ? field.errors[0] : undefined}
                selectedKeys={value}
                onSelectionChange={setValue}
                onChange={(event) => {
                    control.change(event.target.value)
                }}
                onBlur={control.blur}
                onFocus={control.focus}
            >
                {options.map((option) => (
                    <SelectItem key={option.value} value={option.value} textValue={option.label}>
                        {option.label}
                    </SelectItem>
                ))}
            </Select>
        </>
    )
}