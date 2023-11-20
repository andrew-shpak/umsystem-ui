import {Autocomplete, AutocompleteItem, Tooltip} from "@nextui-org/react";
import type {InputHTMLAttributes, ReactNode} from "react";
import {useMemo, useRef, useState} from "react";
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
    const [selectedKey, setSelectedKey] = useState<Key>(config?.defaultValue?.toString() ?? '');
    const [inputValue, setInputValue] = useState<string>('');

    const shadowInputRef = useRef<HTMLInputElement>(null);
    const control = useInputEvent({
        ref: shadowInputRef,
        onReset: () => setSelectedKey(config?.defaultValue?.toString() ?? ''),
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
                   {...conform.input(config, {hidden: true})}/>
            <Autocomplete
                {...rest}
                variant="faded"
                radius="sm"
                inputValue={inputValue}
                onInputChange={setInputValue}
                description={helperText}
                fullWidth={fullWidth}
                isRequired={config.required}
                isDisabled={!!rest.disabled}
                isClearable={isClearable}
                onClear={() => {
                    if (onClear) onClear();
                    setSelectedKey('');
                }}
                errorMessage={config.error}
                className={inputClassName}
                isInvalid={!!config.error}
                minLength={minLength}
                items={items.slice(0, 50)}
                onSelectionChange={onSelectionChange}
                selectedKey={selectedKey}
                onBlur={control.blur}
                onFocus={control.focus}
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