import { forwardRef } from 'react';
import { SnackbarContent, CustomContentProps } from 'notistack';
import { Close, Spin, useToast, UnstyleButton, Attention, SvgProps } from '@/uikit';
import { ToastVariant } from './types';
import omit from 'lodash/omit';
import classNames from 'classnames';
import styles from './Toast.module.scss';

const MarkIcon = (props: SvgProps) => {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20ZM9.29986 13.755L15.4955 7.55929C15.6669 7.38284 15.7619 7.14588 15.7601 6.89993C15.7583 6.65397 15.6598 6.41861 15.4859 6.24469C15.312 6.07077 15.0766 5.97226 14.8307 5.97045C14.5847 5.96865 14.3479 6.06369 14.1715 6.23504L8.63774 11.7706L5.82828 8.96245C5.65224 8.79048 5.41551 8.69485 5.16942 8.6963C4.92333 8.69774 4.68773 8.79614 4.51372 8.97015C4.3397 9.14416 4.24131 9.37976 4.23986 9.62585C4.23842 9.87194 4.33405 10.1087 4.50601 10.2847L7.97577 13.755C8.06265 13.842 8.16585 13.9111 8.27945 13.9582C8.39305 14.0053 8.51483 14.0296 8.63782 14.0296C8.76081 14.0296 8.88258 14.0053 8.99619 13.9582C9.10979 13.9111 9.21298 13.842 9.29986 13.755Z"
                fill="currentColor"
            />
        </svg>
    );
};

type ToastProps = Omit<CustomContentProps, 'variant'> & {
    variant: ToastVariant
}

export const Toast = forwardRef<HTMLDivElement, ToastProps>((props, ref) => {
    const { id, message, variant, className, ...rest } = omit(props, ['anchorOrigin', 'iconVariant']);
    const { close } = useToast();

    const renderIcon = () => {
        if (variant === ToastVariant.SUCCESS) {
            return <MarkIcon />;
        }

        if (variant === ToastVariant.LOADING) {
            return <Spin size='s' />;
        }

        if (variant === ToastVariant.DANGER) {
            return <Attention />;
        }

        if (variant === ToastVariant.WARNING) {
            return <Attention />;
        }
    };

    const handleClose = () => {
        close(id);
    };

    return (
        <SnackbarContent
            ref={ref}
            role='alert'
            className={classNames(className, styles.wrap)}
            {...rest}
        >
            <div className={classNames(styles.toast, styles[variant])}>
                <div className={styles.content}>
                    <div className={styles.icon}>
                        {renderIcon()}
                    </div>

                    <div className={styles.text}>
                        {message}
                    </div>
                </div>

                <UnstyleButton
                    className={styles.button}
                    onClick={handleClose}
                >
                    <Close />
                </UnstyleButton>
            </div>
        </SnackbarContent>
    );
});

Toast.displayName = 'Toast';
