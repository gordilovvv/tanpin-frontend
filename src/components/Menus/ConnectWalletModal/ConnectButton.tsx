import { useState } from 'react';
import { WalletConfig } from '@/config/wallet';
import { WalletButton } from '@/components/Wallet';

type ConnectButtonProps = {
    wallet: WalletConfig,
    onConnect: () => Promise<any>
}

export function ConnectButton({ wallet, onConnect }: ConnectButtonProps) {
    const { icon: Icon, title, installed, recommended, deepLink } = wallet;
    const [isLoading, setIsLoading] = useState(false);
    const isLink = deepLink && installed === false;

    const handleClick = () => {
        if (installed === false) {
            return;
        }

        setIsLoading(true);
        onConnect().then(() => setIsLoading(false));
    };

    if (isLink) {
        return (
            <WalletButton
                as='link'
                href={deepLink}
                target='_blank'
                title={title}
                icon={<Icon />}
                recommended={recommended}
            />
        );
    }

    return (
        <WalletButton
            as='button'
            title={title}
            icon={<Icon />}
            loading={isLoading}
            disabled={installed === false}
            recommended={recommended}
            onClick={handleClick}
        />
    );
}