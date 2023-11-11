import {Listbox, Transition} from '@headlessui/react'
import {CheckIcon, ChevronUpDownIcon} from '@heroicons/react/24/outline'
import {Fragment, useState} from 'react'

export default function ListField<
    T extends object & { url?: string; id?: string },
>(props: {
    data: T[]
    getOptionLabel: (option: T) => string
    getOptionKey?: (option: T) => string
    defaultValue?: T
    name: string
    label: string
    disabled?: boolean
    onChange?: (value: T) => void
}) {
    const {
        getOptionLabel,
        getOptionKey = (option: T) => option.url ?? option.id,
        defaultValue,
        name,
        label,
        disabled = false,
    } = props
    const [selectedValue, setSelectedValue] = useState<T | undefined>(
        defaultValue,
    )
    return (
        <>
            <input
                type="hidden"
                name={name}
                value={selectedValue ? getOptionKey(selectedValue) : selectedValue}
            />
            <Listbox
                disabled={disabled}
                value={selectedValue}
                onChange={value => {
                    setSelectedValue(value)
                    if (props.onChange) props.onChange(value)
                }}
            >
                <div className="relative">
                    <label
                        className="pointer-events-none absolute -top-6  pl-3 font-normal translate-y-0 text-sm text-slate-500">
                        {label}
                    </label>
                    <Listbox.Button
                        className="relative w-full cursor-default text-ellipsis rounded-md text-gray-900 text-sm font-medium hover:bg-gray-200 border-2 border-gray-300 bg-gray-200 outline-2 px-2 py-2">
            <span className="block text-left">
              {selectedValue ? getOptionLabel(selectedValue) : undefined}
            </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
              />
            </span>
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options
                            className="z-10 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {props.data.map(record => {
                                const key = getOptionKey(record)
                                return (
                                    <Listbox.Option
                                        key={key}
                                        className={({active}) =>
                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                            }`
                                        }
                                        value={record}
                                    >
                                        {({selected}) => (
                                            <>
                        <span
                            className={`block truncate ${
                                selected ? 'font-medium' : 'font-normal'
                            }`}
                        >
                          {getOptionLabel(record)}
                        </span>
                                                {selected ? (
                                                    <span
                                                        className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                            <CheckIcon className="h-5 w-5" aria-hidden="true"/>
                          </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Listbox.Option>
                                )
                            })}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </>
    )
}
