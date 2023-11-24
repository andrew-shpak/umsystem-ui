import {useActionData} from "@remix-run/react";
import {Accordion, AccordionItem, Card, CardBody, Divider} from "@nextui-org/react";
import {Chip} from "@nextui-org/chip";
import UserFullNamesTable from "~/src/shared/tables/user-full-names-table";
import type {FullName, UserEducation} from "~/src/shared/types";
import {UserEducationTable} from "~/src/shared/tables";

type Student = {
    url: string
    userFullName: string
    primaryEmail: string
    findByStudentId: boolean
    findByUserFullName: boolean
    findByPassport: boolean
    findByIdentityNumber: boolean
    education: UserEducation[]
    fullName: FullName[]
    identityNumber: string
    studentId: string

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
            <section className="w-full flex flex-col gap-4 mt-4">
                <h3 className="text-center text-xl font-medium">
                    Знайдені збіги
                </h3>
                <h4 className='text-lg'>У разі створення користувача буде створено наступний emil: <span
                    className="font-semibold text-3xl">{actionData?.primaryEmail}</span></h4>
                {actionData?.students ? <Accordion variant="bordered">
                    {actionData?.students
                        ?.sort((a, b) => a.userFullName.localeCompare(b.userFullName))
                        .map((student) => {
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
                                               subtitle={student.primaryEmail} title={title}
                                               isCompact
                                >
                                    <div className="px-2">
                                        <Card className="mb-4">
                                            <CardBody>
                                                <UserFullNamesTable fullName={student.fullName}/>
                                            </CardBody>
                                        </Card>
                                        <Card className="mb-4">
                                            <CardBody>
                                                <UserEducationTable
                                                    education={student.education}
                                                />
                                            </CardBody>
                                        </Card>
                                    </div>
                                </AccordionItem>
                            );
                        })}
                </Accordion> : null}

            </section>
        </div>
    )
}

function getValidationReason(student: Student) {
    if (student.findByStudentId) return "Знайдено за ІПН";
    if (student.findByUserFullName) return "Знайдено за ПІБ";
    if (student.findByPassport) return "Знайдено за паспортом";
    if (student.findByIdentityNumber) return "Знайдено за ідентифікаційним номером";
    return "Знайдено за іншими даними";
}