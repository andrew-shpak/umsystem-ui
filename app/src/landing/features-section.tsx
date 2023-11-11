import {CheckCircleIcon} from '@heroicons/react/24/outline'

const features = [
    'перегляд розкладу занятть on-line на мобільному телефоні',
    'створення та ведення електронного журналу',
    'формування та збереження персональних даних студента',
    'моніторинг якості знань та контролю навчального процесу',
    'персональний кабінет викладача',
    'облік результатів роботи науково-педагогічних працівників',
]
export default function FeaturesSection(props: {
    cdnUrl: string
}) {
    const {cdnUrl} = props;
    return (
        <section className="border-b bg-white px-4" id="features">
            <div className="container mx-auto mb-12">
                <h2 className="pt-12 text-center text-5xl font-medium text-[#484BF2]">
                    Можливості
                </h2>
                <div className="features--row">
                    <picture className="w-full">
                        <source
                            src={`${cdnUrl}/landing/features.avif`}
                            type="image/avif"
                        />
                        <source
                            src={`${cdnUrl}/landing/features.webp`}
                            type="image/webp"
                        />
                        <img
                            loading="lazy"
                            decoding="async"
                            width="100%"
                            height="100%"
                            src={`${cdnUrl}/landing/features.jpeg`}
                            alt="umsystem features"
                        />
                    </picture>
                    <div className="features">
                        {features.map(feature => (
                            <div key={feature} className="feature">
                                <div>
                                    <CheckCircleIcon
                                        className="mr-2 h-8 w-8 text-[#484BF2]"
                                        aria-hidden="true"
                                    />
                                </div>
                                <div>
                                    <div className="text-xl ">{feature}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
