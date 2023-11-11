import {Link} from '@remix-run/react'

export default function MainSection(props: {
    cdnUrl: string
}) {
    const {cdnUrl} = props;
    return (
        <section className="border-b bg-[#EAECEF] px-4 py-32 pt-24">
            <div className="section__main container mx-auto">
                <div className="mr-4 ">
                    <h1 className="text-5xl font-medium text-[#484BF2] ">
                        UMSystem — це сучасна система керування навчальним закладом
                    </h1>
                    <h3 className="my-4 text-2xl font-normal">
                        Використання системи значно покращить конкурентоспроможність
                        навчального закладу
                    </h3>
                    <Link
                        to="#order-form"
                        className="order-btn transition duration-300 ease-in-out"
                    >
                        Замовити
                    </Link>
                </div>
                <picture className="w-full">
                    <source
                        src={`${cdnUrl}/landing/main.avif`}
                        type="image/avif"
                    />
                    <source
                        src={`${cdnUrl}/landing/main.webp`}
                        type="image/webp"
                    />
                    <img
                        loading="lazy"
                        decoding="async"
                        src={`${cdnUrl}/landing/main.png`}
                        alt="order umsystem"
                    />
                </picture>
            </div>
        </section>
    )
}
