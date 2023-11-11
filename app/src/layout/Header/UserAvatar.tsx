import {Menu, Transition} from '@headlessui/react'
import {Link, useNavigate} from '@remix-run/react'
import {Fragment} from 'react'
import {Tooltip, TooltipContent, TooltipTrigger} from '~/src/components'
import {constants} from '~/src/fetch'
import {type SupabaseClient} from '@supabase/auth-helpers-remix'
import {routes} from '~/src/pages'

export default function UserAvatar(props: {
    avatar: string
    userFullName: string
    email: string
    supabase: SupabaseClient
}) {
    const {userFullName, email, avatar: userAvatar, supabase} = props
    const navigate = useNavigate()
    const avatar = userAvatar ? (
        <img
            src={`${constants.CDN_BASE_URL}/avatars/${userAvatar}`}
            alt="User logo"
            className="ml-2 h-10 w-10 cursor-pointer rounded-full"
        />
    ) : (
        <div className="ml-2 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-orange-200">
            {userFullName.substring(0, 1).toUpperCase()}
        </div>
    )
    return (
        <Menu as="div" className="menu">
            <Tooltip placement="left">
                <TooltipTrigger>
                    <Menu.Button as={Fragment}>{avatar}</Menu.Button>
                </TooltipTrigger>
                <TooltipContent className="tooltip">{userFullName}</TooltipContent>
            </Tooltip>

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
                            <Link
                                to={`/${email}/profile`}
                                prefetch="intent"
                                className={`${
                                    active ? 'menu__item--selected' : 'menu__item--unselected'
                                } menu__item group`}
                            >
                                Резюме
                            </Link>
                        )}
                    </Menu.Item>
                    <Menu.Item>
                        {({active}) => (
                            <button
                                className={`${
                                    active ? 'menu__item--selected' : 'menu__item--unselected'
                                } menu__item group`}
                                onClick={async () => {
                                    await supabase.auth.signOut()
                                    navigate(routes.signIn)
                                }}
                            >
                                Вихід
                            </button>
                        )}
                    </Menu.Item>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}
