import type {ActionFunction, LoaderFunction, MetaFunction} from "@remix-run/node";
import {redirect} from "@remix-run/node";
import {Form, useLoaderData, useOutletContext} from "@remix-run/react";
import {uk} from "~/src/i18n";
import {
    FeaturesSection,
    Footer,
    LandingHeader,
    MainSection,
    OrderSystemForm,
    PricingSection,
    TasksSection,
    TeamSection
} from "~/src/landing";
import type {ContextType} from "~/src/shared/types";
import "~/styles/landing.css";
import {ClientOnly} from "remix-utils/client-only";
import {getFieldsetConstraint, parse} from "@conform-to/zod";
import type {Tariff} from "~/src/entities";
import {orderSchema} from "~/src/entities";
import {useForm} from "@conform-to/react";
import {environment} from "~/environment.server";
import {endpoints, routes} from "~/src/constants";
import {commitSession, getSession, setSuccessMessage} from "~/message.server";

const pageTitle = uk.mainPageTitle;
export const meta: MetaFunction = () => {
    return [
        {title: pageTitle},
        {name: "description", content: pageTitle},
    ];
};

export const loader: LoaderFunction = async ({request}) => {
    const {headers} = request
    // const cookie = headers.get('cookie') as string
    // console.log(environment(),"test")
    // const res = await fetch(
    //     `${environment().VITE_TARRIFS_SERVICE_BASE_URL}/${endpoints.tariffs}`,
    //     {
    //         headers: {
    //             Accept: 'application/json',
    //             cookie,
    //         },
    //         credentials: 'include',
    //     },
    // )
    // if (res.status === 401) {
    //     return redirect(`${routes.signIn}?redirect=${request.url}`)
    // }
    // if (res.status === 403) {
    //     return redirect(routes.accessDenied)
    // }
    // return await res.json()
    return null;
}

type LoaderData = {
    tariffs: Tariff[]
}
export default function LandingPage() {
    const response = useLoaderData<LoaderData>()
    const context = useOutletContext<ContextType>()
    // const cdnUrl = context.environment.VITE_CDN_URL;
    // const [form, fields] = useForm({
    //     constraint: getFieldsetConstraint(orderSchema),
    //     onValidate({formData}) {
    //         return parse(formData, {schema: orderSchema});
    //     },
    //     shouldValidate: "onBlur",
    // });
    return (
        <>
            1
            {/*<ClientOnly fallback={"Loading...."}>*/}
            {/*    {() => <LandingHeader cdnUrl={cdnUrl}/>}*/}
            {/*</ClientOnly>*/}
            {/*<MainSection cdnUrl={cdnUrl}/>*/}
            {/*<FeaturesSection cdnUrl={cdnUrl}/>*/}
            {/*<TasksSection/>*/}
            {/*<PricingSection cdnUrl={cdnUrl}/>*/}
            {/*<TeamSection cdnUrl={cdnUrl}/>*/}
            {/*<section id="order-form" className="bg-slate-100 pb-4">*/}
            {/*    <div className="container mx-auto px-8 md:w-1/2 lg:px-0">*/}
            {/*        <h2 className="py-12 text-center text-5xl font-medium text-[#484BF2]">*/}
            {/*            Оформіть заявку*/}
            {/*        </h2>*/}

            {/*        <Form*/}
            {/*            method="post"*/}
            {/*            {...form.props}*/}
            {/*            className="mb-10 mt-4 flex flex-col items-center justify-center gap-2"*/}
            {/*        >*/}
            {/*            /!*<OrderSystemForm fields={fields} tariffs={response.tariffs}/>*!/*/}
            {/*            <div className="flex w-full flex-col items-center justify-center">*/}
            {/*                <button*/}
            {/*                    type="submit"*/}
            {/*                    className="order-btn w-full transition duration-300 ease-in-out"*/}
            {/*                >*/}
            {/*                    Оформити*/}
            {/*                </button>*/}
            {/*            </div>*/}
            {/*        </Form>*/}
            {/*    </div>*/}
            {/*</section>*/}
            {/*<Footer cdnUrl={cdnUrl}/>*/}
        </>
    );
}
export const action: ActionFunction = async ({request}) => {
    const {headers} = request
    const formData = await request.formData();
    const submission = parse(formData, {schema: orderSchema});
    const cookie = headers.get('cookie') as string
    const session = await getSession(cookie)
    const response = await fetch(
        `${environment().VITE_EMAILS_SERVICE_BASE_URL}/${endpoints.orderSystem}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                cookie,
            },
            credentials: 'include',
            body: JSON.stringify(submission.value),
        },
    )
    if (response.ok) {
        setSuccessMessage(
            session,
            "Дякуємо! Ваше замовлення надіслано, розробники зв'яжуться з Вами у найкоротший термін.",
        )
        return redirect(routes.root, {
            headers: {'Set-Cookie': await commitSession(session)},
        })
    }
    if (response.status === 401) {
        return redirect(`${routes.signIn}?redirect=${request.url}`)
    }

    return await response.json()
};
