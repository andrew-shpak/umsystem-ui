import type {ReactNode} from 'react';
import {useState} from 'react'
// import Sidebar from '~/src/components/layout/Sidebar'
// import Breadcrumb from './Breadcrumb'
// import {minSidebarWidth} from '~/src/components/layout/constants'
import type {ContextType} from '~/src/shared/types'
import {useOutletContext} from "@remix-run/react";
import "~/styles/layout.css"
export type LayoutProps = {
    title: NonNullable<string>
    children: NonNullable<ReactNode>
}

export default function Layout(props: LayoutProps) {
    // const width = useWindowWidth()
    const [hideNavigation, setHideNavigation] = useState<boolean>(true)
    const {theme} = useOutletContext<ContextType>();
    return (
        <>
            <header className="flex h-24 items-center bg-white  px-4">
                {/*<Header*/}
                {/*  setHideNavigation={setHideNavigation}*/}
                {/*  hideNavigation={hideNavigation}*/}
                {/*  {...props}*/}
                {/*/>*/}
            </header>
            <div className="content">
                <nav
                    className={`${hideNavigation ? 'w-4' : 'w-full md:w-72'} bg-white`}
                >
                    {/*<Sidebar*/}
                    {/*  hidden={hideNavigation}*/}
                    {/*  permissions={props.permissions}*/}
                    {/*  isAdmin={props.user.user.isAdmin}*/}
                    {/*/>*/}
                </nav>
                <main
                    // hidden={width <= minSidebarWidth ? !hideNavigation : false}
                    className={`${theme} scrollbar-thumb-rounded-full flex-1 overflow-y-auto rounded-b-md rounded-t-lg bg-gradient-to-r from-purple-500 to-indigo-500  px-4 pb-4 scrollbar scrollbar-track-inherit  scrollbar-thumb-slate-300 sm:block `}
                >
                    <section
                        className="mt-4 flex w-full  flex-wrap items-center justify-between rounded-lg bg-white px-4 py-3  shadow-xl ring-1 ring-black ring-opacity-5">
                        <h1 className="text-xl font-medium ">{props.title}</h1>
                        {/*<Breadcrumb/>*/}
                    </section>
                    <section
                        className=" mt-4 w-full  rounded-lg bg-white p-4 shadow-xl ring-1 ring-black ring-opacity-5">
                        {props.children}
                    </section>
                </main>
                <aside className="w-4  bg-white"/>
            </div>
        </>
    )
}
