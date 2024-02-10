import { useCallback, useState } from 'react';
import { Button, Close, InjectedWallet, Logout, UnstyleButton } from '@/uikit';
import { ErrorMessageModal } from '@/components/Modals';
import { MenuLink } from './Link/MenuLink';
import { TokenInfo } from './Token/TokenInfo';
import { useAuth } from '@/states/user/hooks/useAuth';
import { useTokenBalance } from '@/hooks/useTokenBalance';
import { useNativeBalance } from '@/hooks/useNativeBalance';
import { useTranslation } from '@/localization';
import { useAccount } from '@/states/user/hooks/useAccount';
import { Address } from 'wagmi';
import { walletMenuLinks } from '../config';
import { activeChain, activeChainId } from '@/config/chain';
import { ellipseAddress } from '@/utils/addressHelper';
import { CONTRACTS } from '@/config/constants/contracts';
import { logError } from '@/utils/sentry';
import maticLogo from '@/app/assets/images/matic.png';
import usdtLogo from '@/app/assets/images/usdt.png';
import styles from './WalletMenu.module.scss';

type WalletMenuProps = {
    address: Address,
    onClose?: () => void
}

export function WalletMenu({ address, onClose }: WalletMenuProps) {
    const { t } = useTranslation();
    const { logout } = useAuth();
    const { connector } = useAccount();
    const [isDisconnecting, setIsDisconnecting] = useState(false);
    const [disconnectError, setDisconnectError] = useState<string | undefined>();

    const usdtBalance = useTokenBalance(
        CONTRACTS.usdt[activeChainId].address,
        CONTRACTS.usdt[activeChainId].decimals
    );
    const maticBalance = useNativeBalance(address);

    const handleLogout = useCallback(() => {
        if (connector?.name === 'Telegram') {
            try {
                setIsDisconnecting(true);
                logout().then(() => setIsDisconnecting(false));
            } catch (error) {
                logError(error);
                setDisconnectError(t('Unable to logout. Please try again'));
            }
        } else {
            logout();
        }
    }, [connector, logout, setIsDisconnecting, setDisconnectError]);

    return (
        <div className={styles.wrap}>
            <div className={styles.head}>
                <div className={styles.headLogo}>
                    <InjectedWallet />
                </div>

                <div className={styles.headContent}>
                    <div className={styles.headChain}>
                        {activeChain.name}
                    </div>

                    <div className={styles.headAddress}>
                        {ellipseAddress(address)}
                    </div>
                </div>

                {onClose && <UnstyleButton
                    className={styles.headClose}
                    onClick={onClose}
                >
                    {<Close />}
                </UnstyleButton>}
            </div>

            <div className={styles.balancesWrap}>
                <div className={styles.balances}>
                    <TokenInfo
                        image={maticLogo}
                        balance={maticBalance.amount}
                        loading={maticBalance.isLoading}
                        symbol='MATIC'
                    />

                    <TokenInfo
                        image={usdtLogo}
                        balance={usdtBalance.amount}
                        loading={usdtBalance.isLoading}
                        symbol='USDT'
                    />
                </div>
            </div>

            <div className={styles.menu}>
                {walletMenuLinks.map(({ to, text, icon: Icon }) =>
                    <MenuLink
                        key={to}
                        to={to}
                        text={text}
                        iconSlot={<Icon />}
                    />
                )}
            </div>

            <div className={styles.footer}>
                <Button
                    view='danger'
                    iconSlot={<Logout />}
                    loading={isDisconnecting}
                    onClick={handleLogout}
                >
                    {t('Log out')}
                </Button>

                <ErrorMessageModal
                    isOpen={!!disconnectError}
                    error={disconnectError}
                    onClose={() => setDisconnectError(undefined)}
                />
            </div>
        </div>
    );
}