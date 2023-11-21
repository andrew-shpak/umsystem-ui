import {SvgIconProps} from './types'

export default function GoogleIcon(props: SvgIconProps) {
    const {size = 16,color="#fcfcfc"} = props
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            fill={color}
            viewBox="0 0 256 256"
        >
            <title>Google</title>
            <rect width="256" height="256" fill="none"/>
            <path
                d="M128,128h88a88.1,88.1,0,1,1-25.8-62.2"
                fill="none"
                stroke={color}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={size}
            />
        </svg>
    )
}
