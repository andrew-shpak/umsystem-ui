import type {SelectProps} from "@nextui-org/react";
import {Select, SelectItem} from "@nextui-org/react"
import type {FieldConfig} from "@conform-to/react";
import {conform, useInputEvent} from "@conform-to/react";
import {useRef, useState} from "react";
import type {Key} from "@react-types/shared";

type SelectFieldProps = {
    options: { label: string, value: string }[]
    config: FieldConfig<string>
} & Omit<SelectProps, "children" | "selectedKeys" | "onSelectionChange">

export default function SelectField(props: SelectFieldProps) {
    const {options, config, ...rest} = props
    const [value, setValue] = useState<'all' | Iterable<Key>>(new Set(config.defaultValue ? [config.defaultValue] : []));
    const shadowInputRef = useRef<HTMLInputElement>(null);
    const control = useInputEvent({
        ref: shadowInputRef,
        onReset: () => setValue(config?.defaultValue ?? []),
    });
    return (
        <>
            <input ref={shadowInputRef}
                   {...conform.input(config, {hidden: true})}/>
            <Select
                {...rest}
                variant="faded"
                radius="sm"
                isInvalid={!!config.error}
                isDisabled={!!rest.disabled}
                isRequired={config.required}
                errorMessage={config.error}
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