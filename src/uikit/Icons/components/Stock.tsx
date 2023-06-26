import { SvgProps } from '..';

export function Stock(props: SvgProps) {
    return (
        <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8 1.33337H4C2.89543 1.33337 2 2.2288 2 3.33337V12.6667C2 13.7713 2.89543 14.6667 4 14.6667H12C13.1046 14.6667 14 13.7713 14 12.6667V7.33337H10C8.89543 7.33337 8 6.43794 8 5.33337V1.33337ZM14 6.00004V5.88566C14 5.35523 13.7893 4.84652 13.4142 4.47145L10.8619 1.91916C10.4869 1.54409 9.97815 1.33337 9.44771 1.33337H9.33333V5.33337C9.33333 5.70156 9.63181 6.00004 10 6.00004H14Z"
                fill="currentColor"
            />
        </svg>
    );
}