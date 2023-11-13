import {Autocomplete, AutocompleteItem} from "@nextui-org/react";
import type {InputHTMLAttributes, ReactNode} from "react";
import {useRef, useState} from "react";
import type {FieldConfig} from "@conform-to/react";
import {conform, useInputEvent} from "@conform-to/react";

export type AutocompleteFieldProps<T> = Omit<InputHTMLAttributes<HTMLInputElement>,
    "size"
    | "value"
    | "color"
    | "onFocus"
    | "onBlur"
    | "isInvalid"
    | "errorMessage"
    | "onClear"
> & {
    fullWidth?: boolean
    helperText?: ReactNode
    defaultValue?: string
    onClear?: () => void
    isClearable?: boolean
    label: ReactNode
    options: NonNullable<T[]>
    getLabel: (option: T) => string
    getOptionKey?: (option: T) => string
    config: FieldConfig<string>
}
type Fields = object & {
    url?: string
    id?: string
}
type Key = string | number | null | undefined;

export default function AutocompleteField<T extends Fields>(props: AutocompleteFieldProps<T>) {
    const {
        fullWidth = true,
        helperText,
        onChange,
        className: inputClassName = '',
        onClear,
        isClearable = true,
        options,
        getLabel,
        getOptionKey = option => option.url ?? option.id ?? '',
        minLength = 2,
        config,
        ...rest
    } = props;
    const [selectedKey, setSelectedKey] = useState<Key >(config?.defaultValue ?? null);


    const shadowInputRef = useRef<HTMLInputElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const control = useInputEvent({
        ref: shadowInputRef,
        onReset: () => setSelectedKey(config?.defaultValue ?? ''),
    });
    const onSelectionChange = (id: Key) => {
        setSelectedKey(id);
        control.change(id?.toString() ?? '');
    };
    return (
        <>
            <input ref={shadowInputRef}
                   {...conform.input(config, {hidden: true})}/>
            <Autocomplete
                {...rest}
                ref={inputRef}
                variant="faded"
                radius="sm"
                description={helperText}
                fullWidth={fullWidth}
                isRequired={config.required}
                isClearable={isClearable}
                onClear={onClear}
                errorMessage={config.error}
                className={inputClassName}
                isInvalid={!!config.error}
                minLength={minLength}
                items={options}
                onSelectionChange={onSelectionChange}
                selectedKey={selectedKey}
                onBlur={control.blur}
                onFocus={control.focus}
            >
                {(option: T) => {
                    const key = getOptionKey(option)
                    const optionLabel = getLabel(option)
                    return <AutocompleteItem key={key}>{optionLabel}</AutocompleteItem>;
                }}
            </Autocomplete>
        </>
    )
}