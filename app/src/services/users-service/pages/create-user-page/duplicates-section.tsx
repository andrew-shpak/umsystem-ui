import {useActionData} from "@remix-run/react";
import {Accordion, AccordionItem, Divider} from "@nextui-org/react";
import {Chip} from "@nextui-org/chip";
type Student = {
    url: string
    userFullName: string
    primaryEmail: string
    findByStudentId: boolean
    findByUserFullName: boolean
    findByPassport: boolean
    findByIdentityNumber: boolean

}
type ActionData = {
    primaryEmail: string
    students: Student[]
}
export default function DuplicatesSection(props: {}) {
    const actionData = useActionData<ActionData>();
    return (
        <div className={`w-full ${actionData?.students ? "block" : "hidden"}`}>
            <Divider/>
            <section className="w-full flex flex-col gap-4">
                <h3 className="text-center text-xl font-medium">
                    Знайдені збіги
                </h3>
                <h4 className='text-lg'>У разі створення користувача буде створено наступний emil: <span
                    className="font-semibold text-3xl">{actionData?.primaryEmail}</span></h4>
                {actionData?.students ? <Accordion variant="bordered">
                    {actionData?.students?.map((student) => {
                        const title = <div className="gap-2 w-full flex">
                            <span>
                                {student.userFullName}
                            </span>
                            <Chip variant="flat" color="primary">
                                {getValidationReason(student)}
                            </Chip>
                        </div>;
                        return (
                            <AccordionItem key={student.url} aria-label={student.userFullName}
                                           subtitle={student.primaryEmail} title={title}/>
                        );
                    })}
                </Accordion> : null}

            </section>
        </div>
    )
}
function getValidationReason (student: Student){
    if(student.findByStudentId) return "Знайдено за ІПН";
    if(student.findByUserFullName) return "Знайдено за ПІБ";
    if(student.findByPassport) return "Знайдено за паспортом";
    if(student.findByIdentityNumber) return "Знайдено за ідентифікаційним номером";
    return "Знайдено за іншими даними";
}