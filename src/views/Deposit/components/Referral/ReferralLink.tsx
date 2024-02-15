import { Skeleton, SvgProps } from '@/uikit';
import styles from './ReferralLink.module.scss';
import { APP_URL } from '@/config';
import copy from 'copy-to-clipboard';

const Link = (props: SvgProps) => {
    return (
        <svg
            width="25"
            height="24"
            viewBox="0 0 25 24"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M20.5843 7.98847C19.5445 7.23978 18.3267 7 17.5 7H15.5C14.9477 7 14.5 7.44772 14.5 8C14.5 8.55228 14.9477 9 15.5 9H17.5C18.0066 9 18.7889 9.16022 19.4157 9.61153C19.9915 10.0261 20.5 10.7259 20.5 12C20.5 13.2741 19.9915 13.9739 19.4157 14.3885C18.7889 14.8398 18.0066 15 17.5 15H15.5C14.9477 15 14.5 15.4477 14.5 16C14.5 16.5523 14.9477 17 15.5 17H17.5C18.3267 17 19.5445 16.7602 20.5843 16.0115C21.6751 15.2261 22.5 13.9259 22.5 12C22.5 10.0741 21.6751 8.77386 20.5843 7.98847Z"
                fill="currentColor"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.4157 7.98847C5.45554 7.23978 6.67331 7 7.5 7H9.5C10.0523 7 10.5 7.44772 10.5 8C10.5 8.55228 10.0523 9 9.5 9H7.5C6.99336 9 6.21113 9.16022 5.5843 9.61153C5.00847 10.0261 4.5 10.7259 4.5 12C4.5 13.2741 5.00847 13.9739 5.5843 14.3885C6.21113 14.8398 6.99336 15 7.5 15H9.5C10.0523 15 10.5 15.4477 10.5 16C10.5 16.5523 10.0523 17 9.5 17H7.5C6.67331 17 5.45554 16.7602 4.4157 16.0115C3.32487 15.2261 2.5 13.9259 2.5 12C2.5 10.0741 3.32487 8.77386 4.4157 7.98847Z"
                fill="currentColor"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.5 12C7.5 11.4477 7.94772 11 8.5 11H16.5C17.0523 11 17.5 11.4477 17.5 12C17.5 12.5523 17.0523 13 16.5 13H8.5C7.94772 13 7.5 12.5523 7.5 12Z"
                fill="currentColor"
            />
        </svg>
    );
};

type ReferralLinkProps = {
    referralId?: string | number,
    loading?: boolean
}

export function ReferralLink({ referralId, loading }: ReferralLinkProps) {
    const link = `${APP_URL}/deposit?r=${referralId}`;

    // TODO: toast
    const copyHandler = () => {
        copy(link);
    };

    if (loading || !referralId) {
        return <Skeleton className={styles.loader} />;
    }

    return (
        <div
            className={styles.field}
            onClick={copyHandler}
        >
            <div className={styles.icon}>
                <Link />
            </div>

            <div className={styles.value}>
                {link}
            </div>
        </div>
    );
}