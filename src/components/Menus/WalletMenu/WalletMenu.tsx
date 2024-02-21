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
import { Address } from 'wagmi';
import { walletMenuLinks } from '../config';
import { activeChain, activeChainId } from '@/config/chain';
import { ellipseAddress } from '@/utils/addressHelper';
import { getAddressExplorerURL } from '@/utils/explorer';
import { CONTRACTS } from '@/config/constants/contracts';
import { TRANSFER_TOKEN_AVAILABLE } from '@/config';
import { logError } from '@/utils/sentry';
import tanpinCoinLogo from '@/app/assets/images/tanpin-coin.png';
import maticLogo from '@/app/assets/images/matic.png';
import usdtLogo from '@/app/assets/images/usdt.png';
import styles from './WalletMenu.module.scss';

type WalletMenuProps = {
    address: Address,
    onTransfer: () => void
}

export function WalletMenu({ address, onTransfer }: WalletMenuProps) {
    const { t } = useTranslation();
    const { logout } = useAuth();
    const { connector } = useAccount();
    const [isDisconnecting, setIsDisconnecting] = useState(false);
    const [disconnectError, setDisconnectError] = useState<string | undefined>();

    const tanpinBalance = useTokenBalance(
        CONTRACTS.tanpin[activeChainId].address,
        CONTRACTS.tanpin[activeChainId].decimals
    );
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
                        image={maticLogo}
                        balance={maticBalance.amount}
                        loading={maticBalance.isLoading}
                        symbol='MATIC'
                    />

                    <TokenInfo
                        image={tanpinCoinLogo}
                        balance={tanpinBalance.amount}
                        loading={tanpinBalance.isLoading}
                        symbol='TANPIN'
                    />

                    <TokenInfo
                        image={usdtLogo}
                        balance={usdtBalance.amount}
                        loading={usdtBalance.isLoading}
                        symbol='USDT'
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