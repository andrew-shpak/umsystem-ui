import {
    AcademicCapIcon,
    ArrowsRightLeftIcon,
    CalendarIcon,
    DocumentDuplicateIcon,
    HandThumbUpIcon,
} from '@heroicons/react/24/outline'

const tasks = [
    {
        icon: (
            <AcademicCapIcon
                className="h-14 w-16 text-[#484BF2]"
                aria-hidden="true"
            />
        ),
        text: `Планування, контроль та аналіз навчальної діяльності`,
    },
    {
        icon: (
            <ArrowsRightLeftIcon
                className="h-14 w-16 text-[#484BF2]"
                aria-hidden="true"
            />
        ),
        text: `Можливості безпосереднього обміну даними`,
    },
    {
        icon: (
            <DocumentDuplicateIcon
                className="h-14 w-16 text-[#484BF2]"
                aria-hidden="true"
            />
        ),
        text: `Оперативний доступ до усіх документів, єдина система звітів`,
    },
    {
        icon: (
            <CalendarIcon className="h-14 w-16 text-[#484BF2]" aria-hidden="true"/>
        ),
        text: `Формування графіку навчального процесу`,
    },
    {
        icon: (
            <HandThumbUpIcon
                className="h-14 w-16 text-[#484BF2]"
                aria-hidden="true"
            />
        ),
        text: `Рейтингування викладачів, кафедр, факультетів`,
    },
]

export default function TasksSection() {
    return (
        <section className="border-b bg-[#484BF2] px-4" id="tasks">
            <div className="container mx-auto mb-12">
                <h2 className="mx-12 py-12 text-center text-5xl font-medium text-white">
                    Завдання
                </h2>
                <div className="tasks flex w-full flex-wrap items-center justify-center">
                    {tasks.map(task => {
                        return (
                            <div
                                key={task.text}
                                className="task mx-2 my-2 sm:basis-1/4 md:my-0 xl:basis-1/6"
                            >
                                <div key={task.text} className="task__item">
                                    {task.icon}
                                    <p className="mt-6 text-center">{task.text}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
