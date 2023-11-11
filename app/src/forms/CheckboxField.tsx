import {Checkbox} from '@nextui-org/react'
import {InputHTMLAttributes, ReactNode} from 'react'

type CheckboxFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>,
    "size"
    | "value"
    | "color"
    | "onFocus"
    | "onChange"
    | "onBlur"
    | "isInvalid"
    | "errorMessage"
    | "onClear"
> & {
    label?: ReactNode
    name: string
    defaultChecked?: boolean
    onChange?: (value: boolean) => void
}

export default function CheckboxField(props: CheckboxFieldProps) {
    const {
        label,
        name,
        defaultChecked = false,
        onChange,
        disabled,
        className,
        ...rest
    } = props
    return (
        <Checkbox {...rest}
                  radius="sm"
                  color="success"
                  defaultSelected={defaultChecked}
        >{label}</Checkbox>
    )
}
