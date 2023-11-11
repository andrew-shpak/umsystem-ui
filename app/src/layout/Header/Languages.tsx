import {LanguageIcon} from '@heroicons/react/24/outline'
import {Menu, Transition} from '@headlessui/react'
import {Fragment} from 'react'

const label = (
    <LanguageIcon
        className="menu__btn h-9 w-9 cursor-pointer rounded-md bg-violet-200 text-zinc-600 shadow hover:bg-violet-800 hover:text-slate-200"
        aria-hidden="true"
    />
)

export default function Languages() {
    return (
        <Menu as="div" className="menu z-10">
            <Menu.Button as={Fragment}>{label}</Menu.Button>
            <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
            >
                <Menu.Items className="menu__items w-40">
                    <Menu.Item>
                        {({active}) => (
                            <button
                                className={`${
                                    active ? 'menu__item--selected' : 'menu__item--unselected'
                                } menu__item group`}
                            >
                                Українська
                            </button>
                        )}
                    </Menu.Item>
                    <Menu.Item>
                        {({active}) => (
                            <button
                                className={`${
                                    active ? 'menu__item--selected' : 'menu__item--unselected'
                                } menu__item group`}
                            >
                                English
                            </button>
                        )}
                    </Menu.Item>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}
