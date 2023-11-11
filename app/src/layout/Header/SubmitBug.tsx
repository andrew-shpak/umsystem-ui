import {BugAntIcon} from '@heroicons/react/24/outline'

export default function SubmitBug() {
    return (
        <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSeqXA0dli8-UxJ7OEfRXZnyx1pmS4cH2Od6B_UD8z-nLEZTbA/viewform"
            target="_blank"
            className="header-btn"
            rel="noreferrer"
        >
            <BugAntIcon aria-hidden="true"/>
        </a>
    )
}
