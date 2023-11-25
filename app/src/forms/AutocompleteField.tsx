import {Autocomplete, AutocompleteItem, Tooltip} from "@nextui-org/react";
import type {InputHTMLAttributes, ReactNode} from "react";
import {useMemo, useRef, useState} from "react";
import {conform, Field, useField, useInputEvent} from "@conform-to/react";

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
} & Field<string>
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
        name,
        formId,
        ...rest
    } = props;
    const field = useField({name, formId});
    const fieldProps = conform.input(field);
    const [selectedKey, setSelectedKey] = useState<Key>(fieldProps?.defaultValue?.toString() ?? '');
    const defaultEntity = useMemo(() => {
        return options.find(option => getOptionKey(option) === fieldProps?.defaultValue?.toString())
    }, [options, getOptionKey, fieldProps?.defaultValue])
    const [inputValue, setInputValue] = useState<string>(defaultEntity
        ? getLabel(defaultEntity)
        : '');

    const shadowInputRef = useRef<HTMLInputElement>(null);
    const control = useInputEvent({
        ref: shadowInputRef,
        onReset: () => setSelectedKey(fieldProps?.defaultValue?.toString() ?? ''),
    });
    const onSelectionChange = (id: Key) => {
        setSelectedKey(id);
        const option = options.find(option => getOptionKey(option) === id);
        setInputValue(option ? getLabel(option) : '');
        control.change(id?.toString() ?? '');
    };

    const items = useMemo(() => {
        if (selectedKey) return options;
        return options.filter(option => {
            const optionLabel = getLabel(option)
            return optionLabel.toLowerCase().includes(inputValue.toLowerCase())
        })
    }, [selectedKey, options, getLabel, inputValue])
    return (
        <>
            <input ref={shadowInputRef}
                   type="hidden"
                   {...fieldProps}/>
            <Autocomplete
                {...rest}
                {...control}
                variant="faded"
                radius="sm"
                inputValue={inputValue}
                onInputChange={setInputValue}
                description={helperText}
                fullWidth={fullWidth}
                isRequired={fieldProps.required}
                isDisabled={!!rest.disabled}
                isClearable={isClearable}
                onClear={() => {
                    if (onClear) onClear();
                    setSelectedKey('');
                }}
                errorMessage={field.errors?.length ? field.errors[0] : undefined}
                className={inputClassName}
                isInvalid={!!field.errors}
                minLength={minLength}
                items={items.slice(0, 50)}
                onSelectionChange={onSelectionChange}
                selectedKey={selectedKey}
            >
                {(option: T) => {
                    const key = getOptionKey(option)
                    const optionLabel = getLabel(option)
                    return (<AutocompleteItem key={key} textValue={optionLabel} as="div">
                        <Tooltip content={optionLabel}>
                            <div>
                                {optionLabel}
                            </div>
                        </Tooltip>
                    </AutocompleteItem>);
                }}
            </Autocomplete>
        </>
    )
}