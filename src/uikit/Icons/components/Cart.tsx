import { SvgProps } from '..';

export function Cart(props: SvgProps) {
    return (
        <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1.5 2.25C1.5 1.83579 1.83579 1.5 2.25 1.5H3.75C4.11663 1.5 4.42952 1.76506 4.4898 2.1267L4.76035 3.75H15.75C15.9911 3.75 16.2175 3.86589 16.3584 4.06147C16.4994 4.25704 16.5377 4.50846 16.4615 4.73717L14.2115 11.4872C14.1094 11.7934 13.8228 12 13.5 12H5.25C4.88337 12 4.57048 11.7349 4.5102 11.3733L3.11465 3H2.25C1.83579 3 1.5 2.66421 1.5 2.25ZM5.01035 5.25L5.88535 10.5H12.9594L14.7094 5.25H5.01035Z"
                fill="currentColor"
            />

            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.5 15C4.5 14.1716 5.17157 13.5 6 13.5C6.82843 13.5 7.5 14.1716 7.5 15C7.5 15.8284 6.82843 16.5 6 16.5C5.17157 16.5 4.5 15.8284 4.5 15Z"
                fill="currentColor"
            />

            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.25 15C11.25 14.1716 11.9216 13.5 12.75 13.5C13.5784 13.5 14.25 14.1716 14.25 15C14.25 15.8284 13.5784 16.5 12.75 16.5C11.9216 16.5 11.25 15.8284 11.25 15Z"
                fill="currentColor"
            />
        </svg>

    );
}