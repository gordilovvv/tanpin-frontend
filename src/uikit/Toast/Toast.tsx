import { forwardRef } from 'react';
import { SnackbarContent, CustomContentProps } from 'notistack';
import { Close, Spin, useToast, UnstyleButton, SvgProps } from '@/uikit';
import { ToastVariant } from './types';
import omit from 'lodash/omit';
import classNames from 'classnames';
import styles from './Toast.module.scss';

const AttentionIcon = (props: SvgProps) => {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 7C12.5523 7 13 7.44772 13 8V13C13 13.5523 12.5523 14 12 14C11.4477 14 11 13.5523 11 13V8C11 7.44772 11.4477 7 12 7ZM13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16V16.0001C11 16.5524 11.4477 17.0001 12 17.0001C12.5523 17.0001 13 16.5524 13 16.0001V16Z"
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
        if (variant === ToastVariant.LOADING) {
            return <Spin size='s' />;
        }

        if (variant === ToastVariant.DANGER) {
            return <AttentionIcon />;
        }

        if (variant === ToastVariant.WARNING) {
            return <AttentionIcon />;
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
