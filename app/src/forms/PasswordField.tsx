import {EyeIcon, EyeSlashIcon} from '@heroicons/react/24/outline'
import type {ReactNode} from 'react';
import {useState} from "react";
import {Input} from "@nextui-org/input";
import type {InputProps} from "@nextui-org/react";
import type {FieldConfig} from "@conform-to/react";
import {conform} from "@conform-to/react";

type TextFieldParams = InputProps & {
    label: ReactNode
    config: FieldConfig<string>
}
export default function PasswordField(props: TextFieldParams) {
    const {
        fullWidth = true,
        onChange,
        onClear,
        isClearable = false,
        config,
        ...rest
    } = props
    const fieldProps = conform.input(config);
    const [isVisible, setIsVisible] = useState(false);
    const [value, setValue] = useState<string | null | undefined>(config?.defaultValue);

    const toggleVisibility = () => setIsVisible(!isVisible);
    return (
        <Input
            {...rest}
            {...fieldProps}
            type={isVisible ? 'text' : 'password'}
            variant="faded"
            radius="sm"
            isInvalid={!!config.error}
            errorMessage={config.error}
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
