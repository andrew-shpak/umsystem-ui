import {ReactNode} from 'react'
import {NumericFormat, NumericFormatProps} from 'react-number-format'
import {Input} from "@nextui-org/input";

type NumberFieldParams = Omit<NumericFormatProps, 'onChange'
    | 'customInput'> & {
    fullWidth?: boolean
    helperText?: ReactNode
    errorMessage?: string
    label?: string
    onChange?: (value: string | number, isValidNumber: boolean) => void
    onClear?: () => void
    isClearable?: boolean
}

export default function NumberField(props: NumberFieldParams) {
    const {
        fullWidth = true,
        helperText,
        className: inputClassName = '',
        onClear,
        isClearable = true,
        allowedDecimalSeparators = [',', '.'],
        allowNegative = false,
        errorMessage,
        defaultValue,
        required,
        name,
    } = props
    return (
        <Input
            as={NumericFormat}
            allowNegative={allowNegative}
            allowedDecimalSeparators={allowedDecimalSeparators}
            type="text"
            name={name}
            variant="faded"
            radius="sm"
            displayType="input"
            thousandSeparator
            isInvalid={!!errorMessage}
            errorMessage={errorMessage}
            description={helperText}
            isClearable={isClearable}
            className={inputClassName}
            onClear={onClear}
            fullWidth={fullWidth}
            isRequired={required}
            defaultValue={defaultValue?.toString()}
            required={required}
        />
    )
}
