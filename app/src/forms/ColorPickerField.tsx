import {ReactNode, useState} from 'react'

// import {Popover} from '~/src/components'

export interface ColorPickerFieldProps {
    name: NonNullable<string>
    label: ReactNode
    fullWidth?: boolean
    placeholder?: string
    defaultValue?: string | null
    disabled?: boolean
    required?: boolean
    className?: string
    errorMessage?: string
    onChange?: (value: Date | null) => void
    onBlur?: (value: Date | null) => void
    helperText?: string
}

export default function ColorPickerField(props: ColorPickerFieldProps) {
    const {
        fullWidth = true,
        name,
        label,
        required = true,
        defaultValue,
        className: inputClassName = '',
        errorMessage,
        helperText,
        onChange,
        onBlur,
        ...rest
    } = props

    const className = `form-input pr-8 ${inputClassName} ${
        fullWidth ? 'w-full' : ''
    }`
    const [value, setValue] = useState<string>(defaultValue ?? '')
    const [focused, setFocused] = useState(false)

    return (
        <>
            {/*<Popover*/}
            {/*  render={() => (*/}
            {/*    <HexColorPicker*/}
            {/*      color={value}*/}
            {/*      onChange={newColor => {*/}
            {/*        setValue(newColor)*/}
            {/*      }}*/}
            {/*    />*/}
            {/*  )}*/}
            {/*>*/}
            {/*  <div*/}
            {/*    className={`input-container ${inputClassName ? '' : 'mb-7'}`}*/}
            {/*    aria-label={'text-input'}*/}
            {/*  >*/}
            {/*    <HexColorInput*/}
            {/*      id={name}*/}
            {/*      type="text"*/}
            {/*      name={name}*/}
            {/*      aria-label={name}*/}
            {/*      color={value}*/}
            {/*      className={className}*/}
            {/*      {...rest}*/}
            {/*      autoComplete="off"*/}
            {/*      onFocus={() => {*/}
            {/*        if (!focused) setFocused(true)*/}
            {/*      }}*/}
            {/*      aria-invalid={*/}
            {/*        (value.toString().length === 0 && focused && required) ||*/}
            {/*        (!!errorMessage && focused)*/}
            {/*      }*/}
            {/*      required={required}*/}
            {/*      onChange={newColor => {*/}
            {/*        setValue(newColor)*/}
            {/*      }}*/}
            {/*    />*/}
            {/*    <label htmlFor={name}>{label}</label>*/}
            {/*    <div*/}
            {/*      className={`relative cursor-pointer ${*/}
            {/*        value?.length > 0 ? 'visible ' : 'invisible'*/}
            {/*      }`}*/}
            {/*      onClick={() => setValue('')}*/}
            {/*    >*/}
            {/*      <XCircleIcon*/}
            {/*        className="absolute bottom-3 right-2.5 h-5 w-5 text-zinc-600"*/}
            {/*        aria-hidden="true"*/}
            {/*      />*/}
            {/*    </div>*/}
            {/*    {helperText || errorMessage ? (*/}
            {/*      <div className={`pl-2 ${errorMessage ? 'text-red-400' : ''}`}>*/}
            {/*        {errorMessage ? errorMessage : helperText}*/}
            {/*      </div>*/}
            {/*    ) : null}*/}
            {/*  </div>*/}
            {/*</Popover>*/}
        </>
    )
}
