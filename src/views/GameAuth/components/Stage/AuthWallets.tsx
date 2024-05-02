import { useCallback, useMemo, useState } from 'react';
import { ArrowDropdown, UnstyleButton } from '@/uikit';
import { ConnectButton, ConnectTelegramButton, WalletsGroup } from '@/components/Wallet';
import { ErrorMessageModal } from '@/components/Modals';
import { useAuth } from '@/states/user/hooks/useAuth';
import { useTranslation } from '@/localization';
import { sortWallets } from '@/utils/sortWallets';
import { ConnectorNames, createWallets } from '@/config/wallet';
import classNames from 'classnames';
import styles from './AuthWallets.module.scss';

export function AuthWallets() {
    const { t } = useTranslation();
    const { login } = useAuth();
    const [hideWallets, setHideWallets] = useState(true);
    const [connectError, setConnectError] = useState<string | undefined>();

    const sortedWallets = useMemo(() => {
        const wallets = createWallets();

        return sortWallets(wallets);
    }, []);

    const visibleWallets = hideWallets
        ? sortedWallets.slice(0, 2)
        : sortedWallets;

    const handleLogin = useCallback(async (id: ConnectorNames) => {
        try {
            await login(id);
        } catch (error) {
            setConnectError((error as Error).message as string);
        }
    }, [login, setConnectError]);

    const handleToggleWallets = () => {
        setHideWallets(hide => !hide);
    };

    return (
        <div className={styles.groups}>
            <WalletsGroup label={t('Messengers')}>
                <ConnectTelegramButton />
            </WalletsGroup>

            <WalletsGroup label={t('Wallets')}>
                {visibleWallets.map(wallet => <ConnectButton
                    key={wallet.id}
                    wallet={wallet}
                    onConnect={() => handleLogin(wallet.connectorId)}
                />)}
            </WalletsGroup>

            <UnstyleButton
                className={classNames(styles.more, {
                    [styles.active]: !hideWallets
                })}
                onClick={handleToggleWallets}
            >
                <div className={styles.moreText}>
                    {hideWallets ? t('More wallets') : t('Less wallets')}
                </div>

                <div className={styles.moreIcon}>
                    <ArrowDropdown />
                </div>
            </UnstyleButton>

            <ErrorMessageModal
                isOpen={!!connectError}
                error={connectError}
                onClose={() => setConnectError(undefined)}
            />
        </div>
    );
}