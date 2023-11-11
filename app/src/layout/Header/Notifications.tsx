import {BellIcon} from '@heroicons/react/24/outline'
import uk from 'date-fns/locale/uk'
import {Fragment} from 'react'
import {Popover} from '~/src/components'
import {Message} from '~/src/fetch/entities'
import {format} from 'date-fns'
import {Link} from '@remix-run/react'
import {routes} from '~/src/pages/routes'

export default function Notifications(props: {
    messages: Message[]
    messagesCount: number
}) {
    return (
        <Popover
            render={({labelId}) => (
                <div className="mt-2 rounded">
                    <div className="flex items-center justify-between  gap-4 px-4 py-3">
                        <h3
                            id={labelId}
                            className="cursor-pointer text-center text-lg font-semibold"
                        >
                            <Link
                                to={routes.notifications}
                                prefetch="intent"
                                className="w-full"
                            >
                                Сповіщення
                            </Link>
                        </h3>
                    </div>
                    <div className="z-20 h-72 overflow-y-auto border-b border-b-slate-200 px-3 py-2">
                        {props.messages.map(message => (
                            <Fragment key={message.url}>
                                <div className="flex items-center justify-between">
                                    <Link
                                        to={`${routes.courses}/${message.courseId}/edit`}
                                        prefetch="intent"
                                        className="cursor-pointer text-center font-medium"
                                    >
                                        {message.title}
                                    </Link>
                                    <div>
                                        {format(new Date(message.createdOn), 'dd.MM.yyyy HH:ss', {
                                            locale: uk,
                                        })}
                                    </div>
                                </div>
                                <div className="text-justify text-sm">{message.content}</div>
                            </Fragment>
                        ))}
                    </div>
                </div>
            )}
        >
            <button className="header-btn relative inline-flex">
                <BellIcon aria-hidden="true"/>
                {props.messagesCount > 0 ? (
                    <span
                        className="absolute right-0 top-0 inline-flex -translate-y-1/2 translate-x-1/2 transform items-center rounded-full bg-rose-500 px-1.5 py-0.5 text-xs font-medium text-white">
            {props.messagesCount}
          </span>
                ) : null}
            </button>
        </Popover>
    )
}
