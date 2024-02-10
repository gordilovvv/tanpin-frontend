import { InjectedWallet, PopoverButton, PopoverState, UnstyleButton } from '@/uikit';
import { ellipseAddress } from '@/utils/addressHelper';
import { Address } from 'viem';
import classNames from 'classnames';
import styles from './WalletButton.module.scss';

type WalletButtonProps = {
    address?: Address,
    active?: boolean,
    popoverState?: PopoverState,
    onClick?: () => void
}

export function WalletButton({ address, active, popoverState, onClick }: WalletButtonProps) {
    const isPopoverOpened = popoverState?.useState('open');

    const content = (
        <>
            <div className={styles.icon}>
                <InjectedWallet />
            </div>

            {address && <div className={styles.address}>
                {ellipseAddress(address)}
            </div>}
        </>
    );

    if (popoverState) {
        return (
            <PopoverButton
                state={popoverState}
                className={classNames(styles.button, {
                    [styles.active]: isPopoverOpened || active
                })}
            >
                {content}
            </PopoverButton>
        );
    } else {
        return (
            <UnstyleButton
                className={classNames(styles.button, {
                    [styles.active]: active
                })}
                onClick={onClick}
            >
                {content}
            </UnstyleButton>
        );
    }
}