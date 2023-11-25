import {EyeIcon, EyeSlashIcon} from '@heroicons/react/24/outline'
import type {ReactNode} from 'react';
import {useState} from "react";
import {Input} from "@nextui-org/input";
import type {InputProps} from "@nextui-org/react";
import type {FieldConfig, Field} from "@conform-to/react";
import {conform, useField} from "@conform-to/react";

type TextFieldParams = InputProps & Field<string> & {
    label: ReactNode
}
export default function PasswordField(props: TextFieldParams) {
    const {
        fullWidth = true,
        onChange,
        onClear,
        isClearable = false,
        name,
        formId,
        ...rest
    } = props
    const field = useField({ name, formId });
    const fieldProps= conform.input(field);
    const [isVisible, setIsVisible] = useState(false);
    const [value, setValue] = useState<string | null | undefined>(fieldProps?.defaultValue);

    const toggleVisibility = () => setIsVisible(!isVisible);
    return (
        <Input
            {...rest}
            {...fieldProps}
            type={isVisible ? 'text' : 'password'}
            variant="faded"
            radius="sm"
            isInvalid={!!field.errors}
            errorMessage={field.errors?.length ? field.errors[0] :undefined}
            isClearable={isClearable}
            isDisabled={!!rest.disabled}
            isRequired={fieldProps.required}
            onClear={() => {
                if (onClear) onClear();
                setValue('')
            }}
            fullWidth={fullWidth}
            endContent={
                <button className="focus:outline-none cursor-pointer" type="button" onClick={toggleVisibility}>
                    {isVisible ? (
                        <EyeIcon
                            aria-hidden="true"
                            className="h-6 w-6"
                        />
                    ) : (
                        <EyeSlashIcon
                            aria-hidden="true"
                            className="h-6 w-6"
                        />
                    )}
                </button>
            }
            value={value?.toString() ?? ''}
            onChange={event => {
                if (onChange) onChange(event);
                setValue(event.target.value);
            }}
        />
    )
}
