import {useMemo, useRef, useState} from 'react'
import {Combobox, Transition} from '@headlessui/react'
import {CheckIcon, ChevronDownIcon, ChevronUpIcon, XCircleIcon,} from '@heroicons/react/24/outline'

interface MultiSelectFieldProps<T> {
    ariaLabel?: string
    options: NonNullable<T[]>
    name: NonNullable<string>
    getLabel: (option: T) => string
    getOptionKey?: (option: T) => string
    label: string
    className?: string
    placeholder: string
    fullWidth?: boolean
    defaultValue?: T[] | null
    onChange?: (value: T[] | null) => void
    disabled?: boolean
    errorMessage?: string
    required?: boolean
    clearable?: boolean
    limit?: number
}

type Fields = object & {
    url?: string
    id?: string
}
export default function MultiSelectField<T extends Fields>(
    props: MultiSelectFieldProps<T>,
) {
    const {
        name,
        label,
        fullWidth = true,
        getLabel,
        getOptionKey = option => option.url ?? option.id ?? '',
        placeholder,
        defaultValue = null,
        className: inputClassName = '',
        disabled,
        onChange,
        errorMessage,
        required = true,
        clearable = true,
    } = props

    const options = props.options

    const ariaLabel = props.ariaLabel ?? label
    const className = `${fullWidth ? 'w-full' : ''} `
    const [query, setQuery] = useState('')
    const optionKeys = useMemo(() => {
        if (options.length === 0) {
            return []
        }
        const option = options[0]
        return Object.keys(option).filter(f => f !== 'url' && f !== 'id')
    }, [options])
    const items = useMemo(
        () =>
            options.filter(option => {
                const optionLabel = getLabel(option)
                return optionLabel.toLowerCase().includes(query.toLowerCase())
            }),
        [options, query],
    )
    const comboBtnRef = useRef<HTMLButtonElement>(null)
    const [focused, setFocused] = useState(false)
    const [selectedOption, setSelectedOption] = useState<T[]>(defaultValue ?? [])
    const notFound = useMemo(() => {
        return (items.length === 0 && query !== '') || options.length === 0
    }, [items, query, options])
    return (
        <Combobox
            value={selectedOption}
            onChange={option => {
                setSelectedOption(option)
                if (onChange) onChange(option)
                setQuery('')
            }}
            disabled={disabled}
            multiple
        >
            {(agrs: { open: boolean; value: T[] | null }) => {
                const {open, value} = agrs
                return (
                    <div
                        className={`relative ${inputClassName ? inputClassName : 'mb-7'}`}
                    >
                        <div
                            className={`autocomplete flex cursor-pointer items-center gap-2 overflow-hidden text-ellipsis rounded-md border-2 border-gray-300 bg-gray-200 px-2 py-1 text-gray-900 outline-2 ${
                                fullWidth ? 'w-full' : ''
                            }`}
                            aria-label="text-input"
                            onClick={() => {
                                if (!open) comboBtnRef.current?.click()
                                if (!focused) setFocused(true)
                            }}
                        >
                            <input
                                type="hidden"
                                name={name}
                                value={value ? value.map(getOptionKey).join(',') : ''}
                                aria-hidden="true"
                                readOnly
                                tabIndex={-1}
                            />
                            <div className="flex items-center gap-2 flex-wrap">
                                {selectedOption.map((option, index) => (
                                    <div
                                        key={getOptionKey(option)}
                                        className="flex w-max items-center gap-2 rounded-md bg-gray-300 px-1 py-0.5"
                                    >
                                        <span>{getLabel(option)}</span>
                                        {props.disabled ? null : (
                                            <button
                                                type="button"
                                                className="flex-shrink-0 rounded-full focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:ring-offset-2"
                                                onClick={() => {
                                                    if (onChange) onChange(null)
                                                    setSelectedOption(
                                                        selectedOption.filter((o, i) => i !== index),
                                                    )
                                                }}
                                            >
                                                <XCircleIcon
                                                    className="h-4 w-4 text-gray-500"
                                                    aria-hidden="true"
                                                />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className={`${className} pr-14`}>
                                <Combobox.Input
                                    id={name}
                                    type="text"
                                    className="border-none bg-gray-200 outline-none"
                                    placeholder={placeholder}
                                    aria-label={ariaLabel}
                                    required={required}
                                    autoComplete="off"
                                    aria-invalid={!!errorMessage || (focused && required)}
                                    displayValue={(option: T | null) =>
                                        option ? getLabel(option) : ''
                                    }
                                    onChange={event => setQuery(event.target.value)}
                                    onFocus={() => {
                                        if (!open) comboBtnRef.current?.click()
                                        if (!focused) setFocused(true)
                                    }}
                                    onClick={() => {
                                        if (!open) comboBtnRef.current?.click()
                                        if (!focused) setFocused(true)
                                    }}
                                    value={query}
                                />
                                <Combobox.Label className={required ? 'required' : undefined}>
                                    {label}
                                </Combobox.Label>
                            </div>
                            <div>
                                <Combobox.Button
                                    ref={comboBtnRef}
                                    className="flex cursor-pointer items-center gap-2 pr-2"
                                >
                                    {clearable ? (
                                        <XCircleIcon
                                            className={`h-5 w-5 text-zinc-600 ${
                                                selectedOption.length > 0 ? 'visible ' : 'invisible'
                                            }`}
                                            aria-hidden="true"
                                            onClick={() => {
                                                if (onChange) onChange(null)
                                                setSelectedOption([])
                                                setQuery('')
                                                if (!open) comboBtnRef.current?.click()
                                                if (!focused) setFocused(true)
                                            }}
                                        />
                                    ) : null}
                                    {open ? (
                                        <ChevronDownIcon
                                            className="h-5 w-5 text-gray-400"
                                            aria-hidden="true"
                                        />
                                    ) : (
                                        <ChevronUpIcon
                                            className="h-5 w-5 text-gray-400"
                                            aria-hidden="true"
                                        />
                                    )}
                                </Combobox.Button>
                            </div>
                        </div>
                        {open
                            ? null
                            : errorMessage && (
                            <div className={`pl-2 ${errorMessage ? 'text-red-400' : ''}`}>
                                {errorMessage}
                            </div>
                        )}
                        <Transition
                            show={open}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                            afterLeave={() => setQuery('')}
                        >
                            <Combobox.Options
                                static
                                className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                            >
                                {notFound ? (
                                    <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                                        {options.length === 0
                                            ? 'Немає даних'
                                            : 'Нічого не знайдено'}
                                    </div>
                                ) : (
                                    items.map(option => {
                                        const key = getOptionKey(option)
                                        const optionLabel = getLabel(option)
                                        return (
                                            <Combobox.Option
                                                key={key}
                                                className={({active}) =>
                                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                        active ? 'bg-teal-600 text-white' : 'text-gray-900'
                                                    }`
                                                }
                                                value={option}
                                                onClick={() => {
                                                    if (query.length > 0) setQuery('')
                                                }}
                                            >
                                                {({selected, active}) => (
                                                    <>
                            <span
                                className={`block truncate ${
                                    selected ? 'font-medium' : 'font-normal'
                                }`}
                            >
                              {optionLabel}
                            </span>
                                                        {selected ? (
                                                            <span
                                                                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                                                    active ? 'text-white' : 'text-teal-600'
                                                                }`}
                                                            >
                                <CheckIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                />
                              </span>
                                                        ) : null}
                                                    </>
                                                )}
                                            </Combobox.Option>
                                        )
                                    })
                                )}
                            </Combobox.Options>
                        </Transition>
                    </div>
                )
            }}
        </Combobox>
    )
}
