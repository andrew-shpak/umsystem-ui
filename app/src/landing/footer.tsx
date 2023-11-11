import {FacebookIcon, TwitterIcon} from '~/src/icons'
import {GlobeAltIcon} from '@heroicons/react/24/outline'
import {Link} from '@remix-run/react'
import {pagesList} from './header'

const year = new Date().getFullYear()
const getPages = () => (
    <>
        {pagesList.map(page => (
            <li
                key={page.id}
                className="mx-3.5 cursor-pointer text-lg font-medium transition duration-300 ease-in-out hover:border-b-2 hover:border-b-slate-900"
            >
                <Link to={page.id}>{page.title}</Link>
            </li>
        ))}
    </>
)
export default function Footer(props: {
    cdnUrl: string
}) {
    return (
        <footer className="mt-8 bg-white px-4 py-10">
            <div className="container mx-auto">
                <div className="inline-flex w-full items-center justify-between">
                    <img
                        src={`${props.cdnUrl}/landing/footer.svg`}
                        width={252}
                        height={130}
                        alt={'umsystem footer logo'}
                    />
                    <ul className="pages inline-flex items-center justify-between">
                        {getPages()}
                    </ul>
                    <div className="w-[252px]">
                        <div className="social-icons float-right w-[50px] px-3">
                            <button className="cursor-pointer p-1.5 hover:rounded-full hover:bg-slate-200">
                                <FacebookIcon size={24} color={' #6c7889'}/>
                            </button>
                            <button className="my-4 cursor-pointer p-1.5 hover:rounded-full hover:bg-slate-200">
                                <TwitterIcon size={24} color={' #6c7889'}/>
                            </button>
                            <button className="cursor-pointer p-1.5 hover:rounded-full hover:bg-slate-200">
                                <title>Globe</title>
                                <GlobeAltIcon
                                    className="h-6"
                                    aria-hidden="true"
                                    color={' #6c7889'}
                                />
                            </button>
                        </div>
                    </div>
                </div>
                <ul className="mobile-pages inline-flex items-center justify-center text-center">
                    {getPages()}
                </ul>
                <div className="footer__year flex items-center justify-center ">
                    © {year}
                </div>
            </div>
        </footer>
    )
}
