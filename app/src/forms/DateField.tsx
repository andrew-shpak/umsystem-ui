import type {InputHTMLAttributes, ReactNode} from 'react';
import {useState} from 'react'
import uk from 'date-fns/locale/uk'
import 'react-day-picker/dist/style.css';
import format from 'date-fns/format'
import {Input} from "@nextui-org/input";
import {useIMask} from 'react-imask'
import type {FactoryOpts} from "imask";
import {CalendarIcon, EyeIcon, EyeSlashIcon, XMarkIcon} from '@heroicons/react/24/outline';

export type DateFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>,
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
    errorMessage?: string
    defaultValue?: string
    helperText?: ReactNode
    onClear?: () => void
    isClearable?: boolean
    label: ReactNode
    onSubmit?: (value: Date | null) => void
    onChange?: (value: Date | null) => void
    fromDate?: Date
    toDate?: Date
}

export default function DateField(props: DateFieldProps) {
    const {
        fullWidth = true,
        helperText,
        onChange,
        className: inputClassName = '',
        onClear,
        isClearable = true,
        ...rest
    } = props
    const [inputValue, setInputValue] = useState<string| undefined>(
        props.defaultValue
    )
    // const [selected, setSelected] = useState<Date | undefined>(
    //     defaultValue ? new Date(defaultValue) : undefined,
    // )
    // const parsedDate =
    //     inputValue.length > 0
    //         ? parse(inputValue, 'P', new Date(), {locale: uk})
    //         : new Date()
    // const isValidDate =
    //     inputValue.length > 0
    //         ? isValid(parsedDate) && isAfter(parsedDate, minDate)
    //         : false
    //
    const [opts] = useState({mask: Date, radix: '.'})
    const {ref} = useIMask<HTMLInputElement, FactoryOpts>(opts, {
        onAccept: newValue => setInputValue(newValue)
    })
    // const footer = (
    //     <button
    //         className="btn-primary w-[95%]"
    //         onClick={() => {
    //             if (onSubmit) {
    //                 onSubmit(isValidDate ? parsedDate : null)
    //             }
    //         }}
    //     >
    //         Підтвердити
    //     </button>
    // )
    const [open, setOpen] = useState(false);


    return (
        <Input
            {...rest}
            ref={ref}
            type="text"
            variant="faded"
            radius="sm"
            isInvalid={!!rest.errorMessage}
            description={helperText}
            isClearable={isClearable}
            className={inputClassName}
            onClear={onClear}
            fullWidth={fullWidth}
            isRequired={props.required}
        />
    )
}
