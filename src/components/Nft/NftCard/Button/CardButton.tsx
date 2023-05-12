import { memo } from 'react';
import { Button } from '@/uikit';
import { NFTSaleStatus } from '@/states/types';
import classNames from 'classnames';
import styles from './CardButton.module.scss';

type CardButtonProps = {
    status: NFTSaleStatus
    className?: string,
    handleAction: () => void
}

export const CardButton = memo(({ status, className, handleAction }: CardButtonProps) => {
    if (status === NFTSaleStatus.AUCTION) {
        return (
            <div className={classNames(styles.wrap, className)}>
                <Button
                    view='secondary'
                    onClick={(event: any) => {
                        event.preventDefault();
                        event.stopPropagation();

                        handleAction();
                    }}
                >
                    Bid
                </Button>
            </div>
        );
    }

    if (status === NFTSaleStatus.FIXED_PRICE) {
        return (
            <div className={classNames(styles.wrap, className)}>
                <Button
                    view='secondary'
                    onClick={(event: any) => {
                        event.preventDefault();
                        event.stopPropagation();

                        handleAction();
                    }}
                >
                    Bid
                </Button>
            </div>
        );
    }

    return null;
});

CardButton.displayName = 'CardButton';
