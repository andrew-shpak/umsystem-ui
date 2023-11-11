export interface TeamMember {
    position: string
    userName: string
    email: string
    avatar: string
}

export const teamMembers: (cdnUrl: string) => TeamMember[] = (cdnUrl: string) => [
    {
        userName: 'ІГОР ЗУБЕНКО',
        email: 'ihor.zubenko@oa.edu.ua',
        position: 'Team Lead',
        avatar: `${cdnUrl}/landing/ihor.jpg`,
    },
    {
        userName: 'АНДРІЙ ШПАК',
        email: 'andrii.shpak@oa.edu.ua',
        position: 'Full Stack Developer',
        avatar: `${cdnUrl}/landing/andrii.jpeg`,
    },
    {
        userName: 'ЮРІЙ КОЦЮК',
        email: 'yuriy.kotsyuk@oa.edu.ua',
        position: 'Project Manager',
        avatar: `${cdnUrl}/landing/yuriy.jpeg`,
    },
    {
        userName: 'ЛЕСЯ ГОЛОЮХ',
        email: 'lesia.holoiukh@oa.edu.ua',
        position: 'QA Test Engineer',
        avatar: `${cdnUrl}/landing/lesia.jfif`,
    },
]

export default function TeamSection(props: {
    cdnUrl: string
}) {
    const {cdnUrl} = props;
    return (
        <section className="border-b bg-[#484BF2] px-4" id="team">
            <div className="container mx-auto mb-12">
                <h2 className="mx-12 py-12 text-center text-5xl font-medium text-white">
                    Команда
                </h2>
                <div className="members">
                    {teamMembers(cdnUrl).map(member => {
                        return (
                            <div
                                key={member.email}
                                className="member  inline-flex overflow-hidden bg-white"
                            >
                                <div
                                    style={{
                                        background: `url(${member.avatar}) center center`,
                                        backgroundSize: 'cover',
                                        width: '100%',
                                        backgroundRepeat: 'no-repeat',
                                    }}
                                    className={'member__avatar mr-4'}
                                >
                                    <picture>
                                        <img
                                            loading="lazy"
                                            decoding="async"
                                            src={`${cdnUrl}/landing/member.svg`}
                                            alt="Team"
                                            className="float-right hidden h-full md:block"
                                        />
                                    </picture>
                                </div>
                                <div className="my-auto px-4">
                                    <div className="w-full text-lg font-medium text-[#484BF2]">
                                        {member.userName}
                                    </div>
                                    <div className="w-full py-4 text-[#484BF2]">
                                        {member.position}
                                    </div>
                                    <a
                                        href={`mailto:${member.email}`}
                                        className="member__email"
                                        color="inherit"
                                    >
                                        {member.email}
                                    </a>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
