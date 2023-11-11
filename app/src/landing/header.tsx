import {Link} from '@remix-run/react'
import {routes} from '../constants'
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenu,
    NavbarMenuItem,
    NavbarMenuToggle
} from '@nextui-org/react'
import * as  React from 'react'

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


export default function LandingHeader(props: {
    cdnUrl: string
}) {
    const {cdnUrl} = props;
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    return (
        <Navbar as={"header"} isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen} className="bg-white h-24">
            <NavbarContent>
                <NavbarBrand >
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
                </NavbarBrand>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden">
                </NavbarMenuToggle>
            </NavbarContent>
            <NavbarContent as="nav" className="hidden sm:flex" justify="end">
                {pagesList.map(page => (
                    <NavbarItem
                        key={page.id}
                        className="cursor-pointer text-lg font-medium transition duration-300 ease-in-out hover:border-b-2 hover:border-b-slate-900"
                    >
                        <Link to={page.id}>{page.title}</Link>
                    </NavbarItem>
                ))}
                <NavbarItem
                    className="rounded-2xl  bg-[#484BF2] px-6 py-1 text-lg text-[#F6F9FD] transition duration-300 ease-in-out hover:bg-[#3234a9]"

                >
                    <Link
                        to={routes.signIn}
                        prefetch="intent"
                    >
                        Увійти
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarMenu className="text-center">
                {pagesList.map((page, index) => (
                    <NavbarMenuItem key={`${page.id}_${index}`}
                                    className="cursor-pointer text-lg font-medium transition duration-300 ease-in-out hover:border-b-2 hover:border-b-slate-900 lg:mr-7"
                    >
                        <Link to={page.id}>{page.title}</Link>
                    </NavbarMenuItem>
                ))}
                <NavbarMenuItem>
                    <Link
                        to={routes.signIn}
                        prefetch="intent"
                        className="rounded-2xl  bg-[#484BF2] px-6 py-1 text-lg text-[#F6F9FD] transition duration-300 ease-in-out hover:bg-[#3234a9]"
                    >
                        Увійти
                    </Link>
                </NavbarMenuItem>
            </NavbarMenu>
        </Navbar>

    )
}
