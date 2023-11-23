import {redirect} from "@remix-run/node";
import {routes} from "~/src/constants";
const validateResponseStatusCode = (request: Request, response: Response) => {
    if (response.status === 401) {
        return redirect(`${routes.signIn}?redirect=${request.url}`)
    }
    if (response.status === 403) {
        return redirect(routes.accessDenied)
    }
}
export {
    validateResponseStatusCode,
}