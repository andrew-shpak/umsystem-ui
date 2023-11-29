import {Form, useLoaderData, useOutletContext} from "@remix-run/react";
import type {ContextType} from "../types";
import {Copyright} from "~/src/components";
import {GoogleIcon} from "~/src/icons";
import {Button} from "@nextui-org/react";
import {json, LoaderFunctionArgs} from "@remix-run/node";
import {auth} from "~/auth.server";
import {routes} from "~/src/constants";


type LoaderData = {
    image: string | null
    host: string
}

type LoaderError = { message: string } | null;
export const loader = async ({request}: LoaderFunctionArgs) => {
    await auth.isAuthenticated(request, {successRedirect: routes.dashboard});
    const session = await sessionStorage.getSession(
        request.headers.get("Cookie"),
    );
    const error = session.get(auth.sessionErrorKey) as LoaderError;
    return json({error});
};
export default function SignIn() {
    const response = useLoaderData<LoaderData>()
    const context = useOutletContext<ContextType>()
    const cdnUrl = context.environment.CDN_URL
    const {image = ''} = response
    const logo = image
        ? `${cdnUrl}/organizations/${image}`
        : `${cdnUrl}/logo-oa.jpg`
    const caver = 'umsystem-logo.svg'


    return (
        <main className=" w-screen flex-wrap items-center justify-between md:flex">
            <div
                className="bg-cover h-screen items-center justify-center overflow-hidden bg-center bg-no-repeat bg-fafafa box-border m-0 md:flex hidden flex-row flex-wrap  md:w-3/5">
                <img
                    loading="lazy"
                    decoding="async"
                    src={logo}
                    alt="UMSystem logo"
                    className="w-full"
                />
            </div>
            <Form method="post" action={routes.googleAuth} className="bg-white  sm:w-full md:w-2/5">
                <div className="container m-auto flex h-screen w-3/5 flex-col flex-wrap items-center justify-center">
                    <img
                        loading="lazy"
                        decoding="async"
                        src={`${cdnUrl}/${caver}`}
                        alt="UMSystem logo"
                    />
                    <Button fullWidth color="danger" type="submit" variant="solid"
                            startContent={<GoogleIcon size={20}/>}
                    >
                        Увійти
                    </Button>
                    <Copyright className="mt-10 text-center font-normal"/>
                </div>
            </Form>
        </main>
    )
}
