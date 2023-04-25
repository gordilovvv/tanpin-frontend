import classNames from 'classnames';
import styles from './PercentBadge.module.scss';
import { SvgProps } from '@/uikit';

const Arrow = ({ isPositive, ...props }: { isPositive: boolean } & SvgProps) => {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            {isPositive ? <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.7559 12.2559C15.0814 11.9305 15.0814 11.4028 14.7559 11.0774L10.5893 6.91074C10.2638 6.58531 9.73618 6.58531 9.41074 6.91074L5.24408 11.0774C4.91864 11.4028 4.91864 11.9305 5.24408 12.2559C5.56951 12.5814 6.09715 12.5814 6.42259 12.2559L10 8.67851L13.5774 12.2559C13.9028 12.5814 14.4305 12.5814 14.7559 12.2559Z"
                fill="currentColor"
            /> : <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.7559 7.74408C15.0814 8.06951 15.0814 8.59715 14.7559 8.92259L10.5893 13.0893C10.2638 13.4147 9.73618 13.4147 9.41074 13.0893L5.24408 8.92259C4.91864 8.59715 4.91864 8.06951 5.24408 7.74408C5.56951 7.41864 6.09715 7.41864 6.42259 7.74408L10 11.3215L13.5774 7.74408C13.9028 7.41864 14.4305 7.41864 14.7559 7.74408Z"
                fill="currentColor"
            />}
        </svg>
    );
};

type PercentBadgeProps = {
    value: string | number
}

export function PercentBadge({ value }: PercentBadgeProps) {
    const isZero = +value === 0;
    const isPositive = +value > 0;
    const isNegative = +value < 0;

    return (
        <div
            className={classNames(styles.badge, {
                [styles.green]: isPositive,
                [styles.red]: isNegative
            })}
        >
            {!isZero && <div className={styles.icon}>
                <Arrow isPositive={isPositive} />
            </div>}

            <div className={styles.text}>
                {value}%
            </div>
        </div>
    );
}