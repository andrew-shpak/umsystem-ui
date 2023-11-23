const year = new Date().getFullYear();
export default function Copyright(props: { className?: string }) {
    return (
        <strong className={props.className}>
            Всі права захищено © UMSystem {year}
        </strong>
    )
}
