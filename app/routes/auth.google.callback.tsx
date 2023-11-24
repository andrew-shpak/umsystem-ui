import type {ActionFunctionArgs} from "@remix-run/node";
import {auth} from "~/auth.server";
import {routes} from "~/src/constants";


export const loader = async ({request}: ActionFunctionArgs) => {
    return auth.authenticate("google", request, {
        successRedirect: routes.dashboard,
        failureRedirect: routes.signIn,
    });
};