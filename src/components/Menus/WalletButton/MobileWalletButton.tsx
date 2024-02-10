import { HTMLAttributes } from 'react';
import { WalletButton } from './WalletButton';
import { ConnectWalletButton } from '../ConnectWalletButton/ConnectWalletButton';
import { useTranslation } from '@/localization';

type MobileWalletProps = {
    active?: boolean,
    isConnected: boolean,
    onOpenWallet: () => void
}

export function MobileWalletButton({ active, isConnected, onOpenWallet, ...props }: MobileWalletProps & HTMLAttributes<HTMLDivElement>) {
    const { t } = useTranslation();

    const renderButton = () => {
        if (isConnected) {
            return <WalletButton
                active={active}
                onClick={onOpenWallet}
            />;
        }

        return <ConnectWalletButton text={t('Connect')} />;
    };

    return (
        <div {...props}>
            {renderButton()}
        </div>
    );
}