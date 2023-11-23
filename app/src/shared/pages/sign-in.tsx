import {useLoaderData, useLocation, useOutletContext} from "@remix-run/react";
import type {ContextType} from "../types";
import {Copyright} from "~/src/components";
import {GoogleIcon} from "~/src/icons";
import {Button} from "@nextui-org/react";


type LoaderData = {
    image: string | null
    host: string
}


export default function SignIn() {
    const response = useLoaderData<LoaderData>()
    const context = useOutletContext<ContextType>()
    const cdnUrl = context.environment.CDN_URL
    const {image = ''} = response
    const logo = image
        ? `${cdnUrl}/organizations/${image}`
        : `${cdnUrl}/logo-oa.jpg`
    const caver = 'umsystem-logo.svg'
    const location = useLocation()
    const {supabaseClient} = useOutletContext<ContextType>()
    const handleGoogleLogin = async () => {
        await supabaseClient.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `https://dev.umsys.com.ua/auth/callback${location.search}`,
            },
        })
    }


    return (
        <main className="h-screen w-screen flex-wrap items-center justify-between md:flex">
            <img
                loading="lazy"
                decoding="async"
                src={logo}
                alt="UMSystem logo"
                className="bg-cover bg-center bg-no-repeat bg-fafafa box-border m-0 md:flex hidden flex-row flex-wrap h-screen md:w-3/5"
            />
            <div className="bg-white drop-shadow sm:w-full md:w-2/5">
                <div className="container m-auto flex h-screen w-3/5 flex-col flex-wrap items-center justify-center">
                    <img
                        loading="lazy"
                        decoding="async"
                        src={`${cdnUrl}/${caver}`}
                        alt="UMSystem logo"
                        className="mb-10"
                    />
                    <Button fullWidth color="danger" variant="solid" startContent={<GoogleIcon size={20}/>}
                            onClick={handleGoogleLogin}
                    >
                        Увійти
                    </Button>
                    <Copyright className="mt-10 text-center font-normal"/>
                </div>
            </div>
        </main>
    )
}
