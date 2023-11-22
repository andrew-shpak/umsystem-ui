import {NavLink, useLocation} from '@remix-run/react'
import {ReactElement, useEffect, useMemo, useState} from 'react'
import {
    MdExpandLess,
    MdExpandMore,
    MdOutlineBallot,
    MdOutlineLocalLibrary,
    MdOutlinePeopleAlt,
    MdStarBorder,
} from 'react-icons/md'
import {
    documentsServicePages,
    lessonsServicePages,
    pages,
    ratingServicePages,
    selectiveCoursesServicePages,
    surveysServicePages,
    usersServicePages,
} from '~/src/services'
import permissionsServicePages from '../../services/permissions-service'
import {useThrottle} from '~/src/hooks'
import {Page} from '~/src/services/page'
import {Tooltip, TooltipContent, TooltipTrigger} from '~/src/components'
import organizationsServicePages from '~/src/services/organizations-service'

enum SidebarSections {
    general = 'general',
    rating = 'rating',
    surveys = 'surveys',
    users = 'users',
    permissions = 'permissions',
    lessons = 'lessons',
    organizations = 'organizations',
    selectiveCourses = 'selectiveCourses',
    documents = 'documents',
}

type SidebarSectionsType = keyof typeof SidebarSections
const pagesBySection: Record<
    SidebarSectionsType,
    {
        sectionPages: Page[]
        icon: ReactElement
        label: string
    }
> = {
    [SidebarSections.general]: {
        label: 'Довідники',
        icon: <MdOutlineBallot className="h-5 w-5" aria-hidden="true"/>,
        sectionPages: pages,
    },
    [SidebarSections.users]: {
        label: 'Користувачі',
        icon: <MdOutlinePeopleAlt className="h-5 w-5" aria-hidden="true"/>,
        sectionPages: usersServicePages,
    },
    [SidebarSections.rating]: {
        label: 'Рейтинг',
        icon: <MdStarBorder className="h-5 w-5" aria-hidden="true"/>,
        sectionPages: ratingServicePages,
    },
    [SidebarSections.surveys]: {
        label: 'Опитування',
        icon: <MdOutlineLocalLibrary className="h-5 w-5" aria-hidden="true"/>,
        sectionPages: surveysServicePages,
    },
    [SidebarSections.lessons]: {
        label: 'Розклад',
        icon: <MdOutlineBallot className="h-5 w-5" aria-hidden="true"/>,
        sectionPages: lessonsServicePages,
    },
    [SidebarSections.documents]: {
        label: 'Документи',
        icon: <MdOutlineBallot className="h-5 w-5" aria-hidden="true"/>,
        sectionPages: documentsServicePages,
    },
    [SidebarSections.selectiveCourses]: {
        label: 'Вибіркові дисципліни',
        icon: <MdOutlineBallot className="h-5 w-5" aria-hidden="true"/>,
        sectionPages: selectiveCoursesServicePages,
    },
    [SidebarSections.organizations]: {
        label: 'Організації',
        icon: <MdOutlineBallot className="h-5 w-5" aria-hidden="true"/>,
        sectionPages: organizationsServicePages,
    },
    [SidebarSections.permissions]: {
        label: 'Дозволи',
        icon: <MdOutlinePeopleAlt className="h-5 w-5" aria-hidden="true"/>,
        sectionPages: permissionsServicePages,
    },
}
export default function Sidebar(props: {
    hidden: boolean
    permissions: string[]
    isAdmin: boolean
}) {
    const {permissions = []} = props
    const [query, setQuery] = useState('')
    const term = useThrottle(query, 800)
    const display = props.hidden ? 'hidden' : 'block'
    const [extended, setExtended] = useState<SidebarSectionsType[]>([])
    const location = useLocation()
    const isActive = useMemo(
        () => (page: Page) => {
            const {subPages = [], subRoutes = []} = page
            if (page.startWith) {
                return (
                    subRoutes.some(f => f === location.pathname) ||
                    page.url.startsWith(location.pathname) ||
                    subPages.some(f => f.url === location.pathname)
                )
            }
            return (
                subRoutes.some(f => f === location.pathname) ||
                location.pathname.includes(page.url) ||
                subPages.some(f => f.url === location.pathname)
            )
        },
        [location.pathname],
    )
    useEffect(() => {
        if (usersServicePages.some(page => isActive(page))) {
            setExtended([SidebarSections.users])
        } else if (surveysServicePages.some(page => isActive(page))) {
            setExtended([SidebarSections.surveys])
        } else if (ratingServicePages.some(page => isActive(page))) {
            setExtended([SidebarSections.rating])
        } else if (permissionsServicePages.some(page => isActive(page))) {
            setExtended([SidebarSections.permissions])
        } else if (lessonsServicePages.some(page => isActive(page))) {
            setExtended([SidebarSections.lessons])
        } else if (pages.some(page => isActive(page))) {
            setExtended([SidebarSections.general])
        } else if (organizationsServicePages.some(page => isActive(page))) {
            setExtended([SidebarSections.organizations])
        } else if (selectiveCoursesServicePages.some(page => isActive(page))) {
            setExtended([SidebarSections.selectiveCourses])
        } else if (documentsServicePages.some(page => isActive(page))) {
            setExtended([SidebarSections.documents])
        }
    }, [isActive, location.pathname])
    return (
        <>
            <div className={`flex items-center justify-center px-4 ${display}`}>
                {/*<TextField*/}
                {/*    name="page"*/}
                {/*    required={false}*/}
                {/*    label="Пошук сторінки"*/}
                {/*    placeholder="Введіть фрагмент назви"*/}
                {/*    onChange={event => {*/}
                {/*        setQuery(event.target.value)*/}
                {/*    }}*/}
                {/*    fullWidth*/}
                {/*    onClear={() => setQuery('')}*/}
                {/*/>*/}
            </div>
            <ul
                className={`scrollbar-thumb-rounded-full w-full space-y-2 overflow-y-auto px-4 scrollbar scrollbar-track-inherit scrollbar-thumb-slate-300  ${display}`}
                style={{
                    height: 'calc(90vh - 6rem)',
                }}
            >
                {Object.entries(pagesBySection).map(
                    ([section, {label, icon, sectionPages}]) => {
                        if (
                            term.length > 0 &&
                            !sectionPages.some(f =>
                                f.label.toLowerCase().includes(term.toLowerCase()),
                            )
                        ) {
                            return null
                        }
                        const sectionType =
                            SidebarSections[section as keyof typeof SidebarSections]
                        const sectionPermissions = sectionPages
                            .map(page => page.permissions)
                            .flat()
                            .map(f => f?.name)
                            .filter(f => !f?.includes('switch'))

                        const showSection = permissions.some(x =>
                            sectionPermissions.includes(x),
                        )
                        if (!sectionPages.length) return undefined
                        return (
                            <li
                                key={section}
                                hidden={
                                    !showSection ||
                                    (term.length > 0 &&
                                        !sectionPages.some(x =>
                                            x.label.toLowerCase().includes(term.toLowerCase()),
                                        ))
                                }
                            >
                                <Tooltip>
                                    <TooltipTrigger>
                                        <div
                                            className="flex w-full cursor-pointer items-center justify-between rounded-md px-2 py-3 text-base font-normal hover:bg-purple-100"
                                            onClick={() => {
                                                extended.includes(sectionType)
                                                    ? setExtended(state =>
                                                        state.filter(f => f !== section),
                                                    )
                                                    : setExtended([...extended, sectionType])
                                            }}
                                        >
                                            <div className="flex items-center">
                                                {icon}
                                                <span className="ml-3">{label}</span>
                                            </div>
                                            {extended.includes(sectionType) ? (
                                                <MdExpandLess className="h-5 w-5" aria-hidden="true"/>
                                            ) : (
                                                <MdExpandMore className="h-5 w-5" aria-hidden="true"/>
                                            )}
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent className="tooltip">{label}</TooltipContent>
                                </Tooltip>
                                <ul
                                    hidden={
                                        extended.includes(sectionType)
                                            ? undefined
                                            : term.length === 0
                                    }
                                >
                                    {sectionPages.map(page => {
                                        if (
                                            term.length > 0 &&
                                            !page.label.toLowerCase().includes(term.toLowerCase())
                                        ) {
                                            return null
                                        }
                                        if (!extended.includes(sectionType) && term.length === 0) {
                                            return null
                                        }
                                        const {view = true, isAdmin} = page
                                        if (isAdmin && !props.isAdmin) return null
                                        const pagePermissions =
                                            page.permissions
                                                ?.filter(x => x.name.includes('view'))
                                                .map(f => f.name) ?? []
                                        const subPagePermissions =
                                            page.subPages
                                                ?.map(x => x.permissions)
                                                .flat()
                                                ?.filter(x => x?.name.includes('view'))
                                                .map(f => f?.name) ?? []
                                        const viewPermissions = [
                                            ...pagePermissions,
                                            ...subPagePermissions,
                                        ]
                                        if (!permissions.some(x => viewPermissions.includes(x))) {
                                            return null
                                        }
                                        if (!view) return null
                                        return (
                                            <li className="mb-1 flex items-center" key={page.url}>
                                                <Tooltip>
                                                    <TooltipTrigger className="mr-4 w-full">
                                                        <NavLink
                                                            to={page.url}
                                                            prefetch="intent"
                                                            className={`${
                                                                isActive(page)
                                                                    ? 'bg-gradient-to-r from-fuchsia-200 to-purple-300'
                                                                    : ''
                                                            } ml-6 flex w-full items-center rounded-md px-2 py-3 text-base font-normal hover:bg-gradient-to-r hover:from-fuchsia-200 hover:to-purple-200 dark:hover:from-[#222222] dark:hover:to-[#222222]`}
                                                        >
                                                            {page.icon}
                                                            <span className="ml-3 w-full">{page.label}</span>
                                                        </NavLink>
                                                    </TooltipTrigger>
                                                    <TooltipContent className="tooltip">
                                                        {page.label}
                                                    </TooltipContent>
                                                </Tooltip>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </li>
                        )
                    },
                )}
            </ul>
        </>
    )
}
