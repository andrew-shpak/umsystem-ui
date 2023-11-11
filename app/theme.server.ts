import {createCookieSessionStorage} from "@remix-run/node";

import {Theme} from "~/src/shared/types";

// Make use to set the environment variable SESSION_SECRET before running the code
const sessionSecret = "theme" // process.env.SESSION_SECRET ?? "DEFAULT_SECRET";

const themeStorage = createCookieSessionStorage({
    cookie: {
        name: "umsystem_theme",
        secure: true,
        secrets: [sessionSecret],
        sameSite: "lax",
        path: "/",
        httpOnly: true,
    },
});
const themes: Array<Theme> = Object.values(Theme);

function isTheme(value: unknown): value is Theme {
    return typeof value === "string" && themes.includes(value as Theme);
}

async function getThemeSession(request: Request) {
    const session = await themeStorage.getSession(request.headers.get("Cookie"));
    return {
        getTheme: () => {
            const themeValue = session.get("theme");
            return isTheme(themeValue) ? themeValue : null;
        },
        setTheme: (theme: Theme) => session.set("theme", theme),
        commit: () => themeStorage.commitSession(session),
    };
}

export {getThemeSession};