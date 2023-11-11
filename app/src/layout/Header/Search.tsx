import {CogIcon, MagnifyingGlassIcon, XCircleIcon, XMarkIcon,} from '@heroicons/react/24/outline'
import {Dispatch, SetStateAction, useState} from 'react'

export default function Search(props: {
    showCloseButton?: boolean
    setShowCloseButton: Dispatch<SetStateAction<boolean>>
}) {
    const [value, setValue] = useState<string>('')
    const {showCloseButton = false, setShowCloseButton} = props
    const hidden = !showCloseButton ? 'hidden sm:block' : ''
    return (
        <>
            <div className={`relative cursor-pointer ${hidden}`}>
                <MagnifyingGlassIcon
                    className="absolute -right-6 -top-2 h-4 w-4"
                    aria-hidden="true"
                />
            </div>
            <input
                type="text"
                id="search"
                aria-label={'search'}
                placeholder={'Введіть текст'}
                className={`form-input block h-12 w-2/6 rounded-md border-transparent bg-gray-200 indent-5 shadow outline-none placeholder:text-gray-500 ${hidden}`}
                value={value}
                style={{
                    width: props.showCloseButton ? '100%' : undefined,
                }}
                onChange={event => setValue(event.target.value)}
            />
            <div
                className={`relative cursor-pointer  ${
                    value.length > 0 ? 'visible ' : 'invisible'
                }`}
                onClick={() => setValue('')}
            >
                <XCircleIcon
                    className={`absolute ${
                        showCloseButton ? 'right-24' : 'right-2.5'
                    } -top-2.5 h-5 w-5 text-zinc-600`}
                    aria-hidden="true"
                />
            </div>
            <div className={`relative cursor-pointer `}>
                <button
                    className={`absolute ${
                        showCloseButton ? 'right-14' : 'right-2.5'
                    } -top-4 h-8 w-8 rounded-md bg-violet-200  p-1 text-violet-600 shadow hover:bg-violet-800 hover:text-slate-200
        ${hidden}`}
                >
                    <CogIcon aria-hidden="true"/>
                </button>
            </div>
            <div
                className={`relative cursor-pointer `}
                hidden={!showCloseButton}
                onClick={() => setShowCloseButton(state => !state)}
            >
                <XMarkIcon
                    className="absolute -top-4 right-2.5 h-8 w-8 rounded-md bg-red-200  p-1 text-red-600 shadow hover:bg-red-300 hover:text-red-800"
                    aria-hidden="true"
                />
            </div>
        </>
    )
}
