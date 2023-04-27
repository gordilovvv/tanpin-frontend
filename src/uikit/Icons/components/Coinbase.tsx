import { SvgProps } from '..';

export function Coinbase(props: SvgProps) {
    return (
        <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <rect
                width="32"
                height="32"
                rx="6"
                fill="#0052FF"
            />

            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 4C22.6278 4 28 9.37223 28 16C28 22.6278 22.6278 28 16 28C9.37223 28 4 22.6278 4 16C4 9.37223 9.37223 4 16 4Z"
                fill="white"
            />

            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.0444 12.1644H18.9545C19.441 12.1644 19.8343 12.5888 19.8343 13.1105V18.8882C19.8343 19.4112 19.4397 19.8342 18.9545 19.8342H13.0444C12.5578 19.8342 12.1646 19.4098 12.1646 18.8882V13.1105C12.1646 12.5888 12.5592 12.1644 13.0444 12.1644Z"
                fill="#0052FF"
            />
        </svg>
    );
}