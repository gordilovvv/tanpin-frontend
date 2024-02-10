import { useEffect } from 'react';
import { Button } from '@/uikit';
import { useNetwork } from 'wagmi';
import { useTranslation } from '@/localization';
import { useSwitchNetwork } from '@/hooks/useSwitchNetwork';
import { activeChain as supportedChain, activeChainId } from '@/config/chain';
import styles from './NetworkSwitch.module.scss';

type NetworkSwitchProps = {
    onError: (error: string) => void
    onClose?: () => void
}

export function NetworkSwitch({ onError, onClose }: NetworkSwitchProps) {
    const { t } = useTranslation();
    const { chain: currentChain } = useNetwork();
    const { switchNetworkAsync, canSwitch, error, isLoading } = useSwitchNetwork();

    useEffect(() => {
        if (error) {
            onError(error);
        }
    }, [error]);

    const handleSwitchNetwork = async () => {
        const chain = await switchNetworkAsync(activeChainId);

        if (chain) {
            onClose?.();
        }
    };

    return (
        <div className={styles.body}>
            <div className={styles.text}>
                {/* TODO: currentChain?.name СДЕЛАТЬ НАСТОЯЩЕЕ ИМЯ */}
                {t('You are connected to')} <span>{currentChain?.name}</span>. {t('To prevent possible errors, connect to')} <span>{supportedChain.name}</span>
            </div>

            <div className={styles.buttons}>
                {canSwitch && <Button
                    view='primary'
                    loading={isLoading}
                    onClick={handleSwitchNetwork}
                >
                    {t('Switch network')}
                </Button>}

                <Button
                    view='secondary'
                    onClick={onClose}
                >
                    {t('Cancel')}
                </Button>
            </div>
        </div>
    );
}