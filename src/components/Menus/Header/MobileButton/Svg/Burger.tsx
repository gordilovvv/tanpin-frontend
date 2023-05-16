import { SvgProps } from '@/uikit';

export function Burger(props: SvgProps) {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M1 5C1 4.44772 1.44772 4 2 4H18C18.5523 4 19 4.44772 19 5C19 5.55228 18.5523 6 18 6H2C1.44772 6 1 5.55228 1 5Z"
                fill="currentColor"
            />

            <path
                d="M1 15C1 14.4477 1.44772 14 2 14H18C18.5523 14 19 14.4477 19 15C19 15.5523 18.5523 16 18 16H2C1.44772 16 1 15.5523 1 15Z"
                fill="currentColor"
            />
        </svg>
    );
}