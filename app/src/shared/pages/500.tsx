import {Link} from '@remix-run/react'
import {routes} from '~/src/constants'

export default function ErrorPage() {
    const cdnUrl = process.env.CDN_URL ?? '';
    return (
        <div className="flex items-center gap-4">
            <div>
                <h4 className="m-0 p-0 text-[200px] font-bold text-red-500">403</h4>
                <h5 className="text-lg text-red-500">О ні! Щось пішло не так</h5>
                <h5 className="text-lg font-semibold text-red-500">
                    Будь-ласка спробуйте пізніше!
                </h5>
                <div className="item-center flex justify-center">
                    <Link to={routes.dashboard} className="btn-danger mt-2 text-center">
                        На головну
                    </Link>
                </div>
            </div>
            <div className="w-full">
                <img
                    loading="lazy"
                    decoding="async"
                    src={`${cdnUrl}/landing/main.png`}
                    alt="access denied"
                />
            </div>
        </div>
    )
}
