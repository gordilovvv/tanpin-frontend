import { Address } from 'viem';
import { WalletMenu } from '@/components/Menus/WalletMenu/WalletMenu';
import styles from './MobileWallet.module.scss';

type MobileWalletProps = {
    address: Address
}

export function MobileWallet({ address }: MobileWalletProps) {
    return (
        <div className={styles.wrap}>
            <WalletMenu address={address} />
        </div>
    );
}