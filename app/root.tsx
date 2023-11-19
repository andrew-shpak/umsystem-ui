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
    const cookieSession = await getSession(request.headers.get('cookie'))
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
        theme
    } = useLoaderData<typeof loader>();
    const context: ContextType = {
        environment,
        theme
    }
    const navigate = useNavigate();
    return (
        <html lang="en">
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
