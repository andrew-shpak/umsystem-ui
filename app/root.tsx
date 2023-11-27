import type {LinksFunction, LoaderFunction} from "@remix-run/node";
import {json} from "@remix-run/node";
import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useLoaderData,
    useNavigate,
    useRouteError,
} from "@remix-run/react";
import {commitSession, getSession} from "~/message.server";
import {environment} from "~/environment.server";
import type {ContextType} from "./src/shared/types";
import {NextUIProvider} from "@nextui-org/react";
import {getThemeSession} from "./theme.server";
import styles from "./tailwind.css";

export const links: LinksFunction = () => [
    {rel: "stylesheet", href: styles},
];
export const loader: LoaderFunction = async ({request}) => {
    const {headers} = request
    const cookie = headers.get('cookie')
    const cookieSession = await getSession(cookie)
    const themeSession = await getThemeSession(request);
    const response = new Response()
    return json(
        {
            environment: environment(),
            theme: themeSession.getTheme(),
        },
        {
            headers: {
                ...response.headers,
                'Set-Cookie': await commitSession(cookieSession),
            },
        },
    )
}
export default function App() {
    const {
        environment,
        theme,
    } = useLoaderData<typeof loader>();
    const navigate = useNavigate();

    const context: ContextType = {
        environment,
        theme,
    }
    return (
        <html lang="uk-UA">
        <head>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <link rel="icon" type="image/svg+xml" href="/favicon.svg"/>
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
            />
            <Meta/>
            <Links/>
        </head>
        <body>
        <NextUIProvider navigate={navigate}>
            <Outlet context={context}/>
            <ScrollRestoration/>
            <LiveReload/>
            <Scripts/>
        </NextUIProvider>
        </body>
        </html>
    );
}

export function ErrorBoundary() {
    const error = useRouteError()
    // when true, this is what used to go to `CatchBoundary`
    // if (isRouteErrorResponse(error)) {
    //     let pageTitle
    //     switch (error.status) {
    //         case 404:
    //             pageTitle = 'Сторінку не знайдено'
    //             return (
    //                 <Document title={pageTitle} theme={theme}>
    //                     <main className="flex h-screen items-center justify-center bg-[#3C3ECF]   p-4">
    //                         <NotFound />
    //                     </main>
    //                 </Document>
    //             )
    //         case 500:
    //             pageTitle = 'Помилка на сторінці'
    //             return (
    //                 <Document title={pageTitle} theme={theme}>
    //                     <main className="flex h-screen items-center justify-center bg-[#3C3ECF] p-4">
    //                         <ErrorPage />
    //                     </main>
    //                 </Document>
    //             )
    //         default:
    //             return (
    //                 <Document title={`${error.status} ${error.statusText}`} theme={theme}>
    //                     <main>
    //                         <h1>
    //                             {error.status}: {error.statusText}
    //                         </h1>
    //                     </main>
    //                 </Document>
    //             )
    //     }
    // }

    // // Don't forget to typecheck with your own logic.
    // // Any value can be thrown, not just errors!
    // let errorMessage = "Unknown error";
    // if (isDefinitelyAnError(error)) {
    //   errorMessage = error.message;
    // }

    return (
        <main>
            {JSON.stringify(error, null, 2)}
        </main>
    )
}