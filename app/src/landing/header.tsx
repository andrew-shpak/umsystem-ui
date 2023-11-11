import {useState} from 'react'
import {Link} from '@remix-run/react'
import {Bars4Icon} from '@heroicons/react/24/outline'
import {routes} from '../constants'
// import {useWindowSize} from "@react-hook/window-size";

export const pagesList = [
    {
        title: 'Можливості',
        id: '#features',
    },
    {
        title: 'Завдання',
        id: '#tasks',
    },
    {
        title: 'Ціна',
        id: '#prices',
    },
    {
        title: 'Команда',
        id: '#team'
    },
]
const getPages = () => (
    <>
        {pagesList.map(page => (
            <li
                key={page.id}
                className="cursor-pointer text-lg font-medium transition duration-300 ease-in-out hover:border-b-2 hover:border-b-slate-900 lg:mr-7"
            >
                <Link to={page.id}>{page.title}</Link>
            </li>
        ))}
    </>
)

function HeaderNavigation() {
    const [hidden, setHidden] = useState<boolean>(true)
    // const [width] = useWindowSize()
    const mobile =false
    return (
        <>
            <Bars4Icon
                onClick={() => setHidden(state => !state)}
                className="icon h-6 w-6 cursor-pointer"
                aria-hidden="true"
            />
            <nav
                hidden={hidden ? mobile : undefined}
                className={`${mobile ? 'text-center' : ''}`}
            >
                <ul>
                    {getPages()}
                    <li>
                        <Link
                            to={routes.signIn}
                            prefetch="intent"
                            className="rounded-2xl  bg-[#484BF2] px-6 py-1 text-lg text-[#F6F9FD] transition duration-300 ease-in-out hover:bg-[#3234a9]"
                        >
                            Увійти
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default function LandingHeader(props: {
    cdnUrl: string
}) {
    const {cdnUrl} = props;
    return (
        <header className="mx-auto border-b bg-white px-4">
            <div className="container mx-auto flex items-center justify-between">
                <picture>
                    <source
                        src={`${cdnUrl}/landing/umsystem-logo.avif`}
                        type="image/avif"
                    />
                    <source
                        src={`${cdnUrl}/landing/umsystem-logo.webp`}
                        type="image/webp"
                    />
                    <img
                        loading="lazy"
                        decoding="async"
                        src={`${cdnUrl}/landing/umsystem-logo.svg`}
                        alt="UMSystem header logo"
                    />
                </picture>
                <HeaderNavigation/>
            </div>
        </header>
    )
}
