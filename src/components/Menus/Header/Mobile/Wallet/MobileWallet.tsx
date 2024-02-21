import { Address } from 'viem';
import { WalletMenu } from '@/components/Menus/WalletMenu/WalletMenu';
import { TransferModalContainer } from '@/components/Modals';
import { useOpenedState } from '@/hooks/useOpenedState';
import { TRANSFER_TOKEN_AVAILABLE } from '@/config';
import styles from './MobileWallet.module.scss';

type MobileWalletProps = {
    address: Address
}

export function MobileWallet({ address }: MobileWalletProps) {
    const transferModal = useOpenedState();

    return (
        <div className={styles.wrap}>
            <WalletMenu
                address={address}
                onTransfer={transferModal.open}
            />

            {TRANSFER_TOKEN_AVAILABLE && <TransferModalContainer
                isOpen={transferModal.isOpen}
                onClose={transferModal.close}
            />}
        </div>
    );
}