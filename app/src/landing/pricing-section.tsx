export interface ListItem {
    title: string
    icon?: string
    month: string
    priceInfo: string
    advantagesList: string[]
}

export const prices: (cdnUrl: string) => ListItem[] = (cdnUrl: string) => [
    {
        title: 'АБІТУРІЕНТ',
        icon: `${cdnUrl}/landing/price.webp`,
        month: `5000 `,
        priceInfo: 'грн. / місяць',
        advantagesList: [
            'До 2000 користувачів',
            'Користувачі',
            'Навантаження',
            'Розклад',
            'Рейтинг',
            'Картка навантаження',
            'Журнал викладача',
        ],
    },
    {
        title: 'СТУДЕНТ',
        icon: `${cdnUrl}/landing/student.webp`,
        month: `8000 `,
        priceInfo: 'грн. / місяць',
        advantagesList: [
            'До 5000 користувачів',
            'Пакет абітурієнт',
            'Фідбек',
            'Вибіркові дисципліни',
        ],
    },
    {
        title: 'ВИКЛАДАЧ',
        icon: `${cdnUrl}/landing/teacher.webp`,
        month: `10000 `,
        priceInfo: 'грн. / місяць',
        advantagesList: [
            'До 10000 користувачів',
            'Пакет студент',
            'Індивідуальний план навчання студента',
            'Генерація дипломів, додатків і довідок',
        ],
    },
    {
        title: 'РЕКТОР',
        icon: `${cdnUrl}/landing/rector.webp`,
        month: `20000 `,
        priceInfo: 'грн. / місяць',
        advantagesList: [
            'До 20000 користувачів',
            'Пакет викладач',
            'Документообіг',
            'Звітність (Звіт міністерства освіти по якості викладання)',
            'Ведення журналу відвідувань',
            'Оцінювання',
        ],
    },
]

export default function PricingSection(props: {
    cdnUrl: string
}) {
    const {cdnUrl} = props;
    return (
        <section className="border-b bg-white px-4" id="prices">
            <div className="container mx-auto mb-14 px-4 lg:px-0">
                <h2 className="py-12 text-center text-5xl font-medium text-[#484BF2]">
                    Прайс
                </h2>
                <div className="mb-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {prices(cdnUrl).map(price => {
                        return (
                            <div
                                className="price__card grid-rows-12 grid text-center text-lg transition duration-300 ease-in-out"
                                key={price.title}
                            >
                                <div className={'row-span-2'}>
                                    <h4 className="text-lg font-medium text-[#484BF2]">
                                        {price.title}
                                    </h4>
                                    <div className="text-[#6C7889]">
                                        <strong className="text-[#484BF2]">{price.month}</strong>
                                        <span>{price.priceInfo}</span>
                                    </div>
                                    <picture className="mt-4 flex  items-center justify-center">
                                        <img
                                            loading="lazy"
                                            decoding="async"
                                            src={price.icon}
                                            className="h-20 w-20"
                                            alt="umsystem price option"
                                        />
                                    </picture>
                                </div>
                                <div className="row-span-8 mb-3 flex flex-col flex-wrap justify-center">
                                    {price.advantagesList.map(advantage => (
                                        <div
                                            key={advantage}
                                            className="mt-4 text-center text-lg text-[#6C7889]"
                                        >
                                            {advantage}
                                        </div>
                                    ))}
                                </div>
                                <button className="price__btn row-span-2 transition duration-300 ease-in-out">
                                    Обрати
                                </button>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
