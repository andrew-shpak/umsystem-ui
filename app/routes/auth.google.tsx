import {auth} from "~/auth.server";
import {routes} from "~/src/constants";
import {ActionFunctionArgs} from "@remix-run/node";

export const action = async ({request}: ActionFunctionArgs) => {
    return await auth.authenticate("google", request, {
        successRedirect: routes.dashboard,
        failureRedirect: routes.signIn,
    });
};