import {SvgIconProps} from '~/src/components/icons/types'

export default function TwitterIcon(props: SvgIconProps) {
    const {size = 16, className} = props
    return (
        <svg
            width={size}
            height={size}
            fill="#fcfcfc"
            viewBox="0 0 256 256"
            className={className}
        >
            <rect width="256" height="256" fill="none"/>
            <rect
                x="40"
                y="144"
                width="176"
                height="56"
                rx="8"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="16"
            />
            <rect
                x="40"
                y="56"
                width="176"
                height="56"
                rx="8"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="16"
            />
        </svg>
    )
}
