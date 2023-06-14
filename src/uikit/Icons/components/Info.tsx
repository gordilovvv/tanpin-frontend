


import { SvgProps } from '..';

export function Info(props: SvgProps) {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0ZM10 5C10.5523 5 11 5.44772 11 6V11C11 11.5523 10.5523 12 10 12C9.44771 12 9 11.5523 9 11V6C9 5.44772 9.44771 5 10 5ZM11 14C11 13.4477 10.5523 13 10 13C9.44771 13 9 13.4477 9 14V14.0001C9 14.5524 9.44771 15.0001 10 15.0001C10.5523 15.0001 11 14.5524 11 14.0001V14Z"
                fill="currentColor"
            />
        </svg>
    );
}