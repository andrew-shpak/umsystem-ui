import {createCookieSessionStorage} from "@remix-run/node";
import {Authenticator} from "remix-auth";
import {environment} from "~/environment.server";
import type {GoogleExtraParams, GoogleProfile} from "remix-auth-google";
import {GoogleStrategy} from "remix-auth-google";

const BASE_URL = environment().BASE_URL;
export const sessionStorage = createCookieSessionStorage({
    cookie: {
        name: environment().AUTH_COOKIE_NAME,
        httpOnly: true,
        path: "/",
        sameSite: "lax",
        secrets: [environment().COOKIE_SECRET], // This should be an env variable
        secure: environment().NODE_ENV === "production",
    },
});

export const auth = new Authenticator<{
    profile: GoogleProfile;
    accessToken: string;
    extraParams: GoogleExtraParams;
}>(sessionStorage);
auth.use(
    new GoogleStrategy(
        {
            clientID: environment().GOOGLE_CLIENT_ID,
            clientSecret: environment().GOOGLE_CLIENT_SECRET,
            callbackURL: new URL("/auth/google/callback", BASE_URL).toString()
        },
        async (props) => {
            return props;
        },
    ),
);