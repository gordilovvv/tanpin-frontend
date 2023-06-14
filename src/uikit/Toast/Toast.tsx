import { SnackbarContent, CustomContentProps, VariantType } from 'notistack';
import { forwardRef } from 'react';
import { Info, Close, Spin, useToast } from '@/uikit';
import styles from './Toast.module.scss';
import { Variant } from './types';



export const Toast = forwardRef<HTMLDivElement, CustomContentProps>(({ id, message, variant }, ref) => {

    const { closeToast } = useToast();

    const renderIcon = (variant: VariantType) => {
        switch (variant) {
            case Variant.DANGER:
                return <Info className={styles.error} />;
            case Variant.ALERT:
                return <Info className={styles.warning} />;
            case Variant.LOADING:
                return <Spin size='s' />;
            case Variant.COMMON:
                return <Info />;
        }
    };

    const handleClose = () => {
        closeToast(id);
    };

    return (
        <SnackbarContent
            ref={ref}
            className={styles.wrapper}

        >
            {renderIcon(variant)}

            <div className={styles.text}>
                {message}
            </div>

            <Close
                className={styles.closeIcon}
                onClick={handleClose}
            />
        </SnackbarContent>
    );
});

Toast.displayName = 'Toast';
