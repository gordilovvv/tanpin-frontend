import { useCallback, useRef } from 'react';
import { PopoverMenu, usePopoverState } from '@/uikit';
import { TransferModalContainer } from '@/components/Modals';
import { WalletMenu } from '../../WalletMenu/WalletMenu';
import { WalletButton } from '../../WalletButton/WalletButton';
import { ConnectWalletButton } from '../../ConnectWalletButton/ConnectWalletButton';
import { useOpenedState } from '@/hooks/useOpenedState';
import { Address } from 'wagmi';
import { Variants } from 'framer-motion';
import { TRANSFER_TOKEN_AVAILABLE } from '@/config';
import styles from './HeaderWallet.module.scss';

const animationHandler = (element: HTMLElement | null) => {
    if (!element) {
        return;
    }

    if (element.classList.contains('appear')) {
        element.classList.remove('appear');
        element.classList.add('disappear');
    } else {
        element.classList.remove('disappear');
        element.classList.add('appear');
    }
};

const animationMap = {
    initial: 'initial',
    animate: 'animate',
    exit: 'exit',
};

const animationVariants = {
    initial: { transform: 'scale(0.62)' },
    animate: { transform: 'scale(1)' },
    exit: { transform: 'scale(0.62)' },
} as Variants;

type HeaderWalletProps = {
    address?: Address,
    isConnected: boolean
}

export function HeaderWallet({ address, isConnected }: HeaderWalletProps) {
    const animationRef = useRef<HTMLDivElement>(null);
    const transferModal = useOpenedState();
    const walletPopoverState = usePopoverState({
        placement: 'bottom-end'
    });

    const handleTransfer = useCallback(() => {
        walletPopoverState.hide();
        transferModal.open();
    }, [transferModal.open, walletPopoverState.hide]);

    return (
        <div className={styles.wallet}>
            {isConnected
                ? <WalletButton
                    address={address}
                    popoverState={walletPopoverState}
                />
                : <ConnectWalletButton />}

            {address && <PopoverMenu
                ref={animationRef}
                state={walletPopoverState}
                width={320}
                gutter={8}
                className={styles.popover}
                {...animationMap}
                variants={animationVariants}
                transition={{ duration: 0.2, ease: [0.35, 0.05, 0.26, 1] }}
                onAnimationStart={() => animationHandler(animationRef.current)}
            >
                <WalletMenu
                    address={address}
                    onTransfer={handleTransfer}
                />
            </PopoverMenu>}

            {TRANSFER_TOKEN_AVAILABLE && address && <TransferModalContainer
                isOpen={transferModal.isOpen}
                onClose={transferModal.close}
            />}
        </div>
    );
}