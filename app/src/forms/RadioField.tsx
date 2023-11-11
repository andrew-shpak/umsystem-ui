import {InputHTMLAttributes} from 'react'

type RadioFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    name: NonNullable<string>
    defaultChecked?: boolean
    label: string
    value: string
}

export default function RadioField(props: RadioFieldProps) {
    const {label, ...rest} = props
    return (
        <div className="inline-flex items-center gap-2">
            <input type="radio" className="form-radio" {...rest} />
            <label>{label}</label>
        </div>
    )
}
