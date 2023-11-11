import {ArrowsUpDownIcon} from '@heroicons/react/24/outline'
import {Link} from '@remix-run/react'
import {routes} from '~/src/pages'
import {Tooltip, TooltipContent, TooltipTrigger} from '~/src/components'

export default function SwitchUser(props: { currentUserFullName?: string }) {
    const {currentUserFullName} = props
    const label = `Ви зайшли під - ${currentUserFullName}`

    return (
        <Tooltip>
            <TooltipTrigger>
                <Link to={routes.switchUser} prefetch="intent">
                    <button
                        className={`header-btn ${
                            currentUserFullName
                                ? 'bg-violet-400 hover:bg-violet-800'
                                : 'bg-violet-200 hover:bg-violet-600'
                        }`}
                    >
                        <ArrowsUpDownIcon aria-hidden="true"/>
                    </button>
                </Link>
            </TooltipTrigger>
            <TooltipContent className="tooltip">{label}</TooltipContent>
        </Tooltip>
    )
}
