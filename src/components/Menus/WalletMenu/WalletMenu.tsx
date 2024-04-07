import { useCallback, useState } from 'react';
import { Button, InjectedWallet, Logout, Transfer, UnstyleLink } from '@/uikit';
import { ErrorMessageModal } from '@/components/Modals';
import { MenuLink } from './Link/MenuLink';
import { TokenInfo } from './Token/TokenInfo';
import { useAuth } from '@/states/user/hooks/useAuth';
import { useTokenBalance } from '@/hooks/useTokenBalance';
import { useNativeBalance } from '@/hooks/useNativeBalance';
import { useTranslation } from '@/localization';
import { useAccount } from '@/states/user/hooks/useAccount';
import { walletMenuLinks } from '../config';
import { activeChain } from '@/config/chain';
import { currencies, nativeCurrency } from '@/config/constants/currency';
import { ellipseAddress } from '@/utils/addressHelper';
import { getAddressExplorerURL } from '@/utils/explorer';
import { TRANSFER_TOKEN_AVAILABLE } from '@/config';
import { logError } from '@/utils/sentry';
import styles from './WalletMenu.module.scss';

type WalletMenuProps = {
    address: `0x${string}`
    onTransfer: () => void
}

export function WalletMenu({ address, onTransfer }: WalletMenuProps) {
    const { t } = useTranslation();
    const { logout } = useAuth();
    const { connector } = useAccount();
    const [isDisconnecting, setIsDisconnecting] = useState(false);
    const [disconnectError, setDisconnectError] = useState<string | undefined>();

    const tanpinBalance = useTokenBalance(currencies.tanpin.address, currencies.tanpin.decimals);
    const usdtBalance = useTokenBalance(currencies.usdt.address, currencies.usdt.decimals);
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
                        <UnstyleLink
                            href={getAddressExplorerURL(address)}
                            target='_blank'
                            rel='noreferrer noopener'
                        >
                            {ellipseAddress(address)}
                        </UnstyleLink>
                    </div>
                </div>
            </div>

            <div className={styles.balancesWrap}>
                <div className={styles.balances}>
                    <TokenInfo
                        image={nativeCurrency.image}
                        balance={maticBalance.amount}
                        loading={maticBalance.isLoading}
                        symbol={nativeCurrency.symbol}
                    />

                    <TokenInfo
                        image={currencies.tanpin.image}
                        balance={tanpinBalance.amount}
                        loading={tanpinBalance.isLoading}
                        symbol={currencies.tanpin.symbol}
                    />

                    <TokenInfo
                        image={currencies.usdt.image}
                        balance={usdtBalance.amount}
                        loading={usdtBalance.isLoading}
                        symbol={currencies.usdt.symbol}
                    />
                </div>
            </div>

            <div className={styles.referral}>
                <Button
                    view='secondary'
                    to='/deposit#friends'
                >
                    {t('Invite friends')}
                </Button>
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

                {TRANSFER_TOKEN_AVAILABLE && <MenuLink
                    text={t('Transfer %currency%', { currency: 'TANPIN' })}
                    iconSlot={<Transfer />}
                    onClick={onTransfer}
                />}
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