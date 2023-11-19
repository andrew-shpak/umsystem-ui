import {EyeIcon, EyeSlashIcon} from '@heroicons/react/24/outline'
import type {InputHTMLAttributes, ReactNode} from 'react';
import {useState} from "react";
import {Input} from "@nextui-org/input";

type TextFieldParams = Omit<InputHTMLAttributes<HTMLInputElement>,
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
    errorMessage?: string
    defaultValue?: string
    onClear?: () => void
    isClearable?: boolean
    label: ReactNode
}
export default function PasswordField(props: TextFieldParams) {
    const {
        fullWidth = true,
        helperText,
        onChange,
        className: inputClassName = '',
        onClear,
        isClearable = false,
        ...rest
    } = props
    const [isVisible, setIsVisible] = useState(false);
    const [value, setValue] = useState<string | null | undefined>(rest?.defaultValue );

    const toggleVisibility = () => setIsVisible(!isVisible);
    return (
        <Input
            {...rest}
            type={isVisible ? 'text' : 'password'}
            variant="faded"
            radius="sm"
            isInvalid={!!rest.errorMessage}
            description={helperText}
            isClearable={isClearable}
            className={inputClassName}
            isDisabled={!!rest.disabled}
            isRequired={props.required}
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
