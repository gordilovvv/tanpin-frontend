import { Button, Buy, Close, InjectedWallet, Logout, Swap, UnstyleButton } from '@/uikit';
import { Address, useDisconnect } from 'wagmi';
import { walletMenuLinks } from '../config';
import { MenuLink } from './Link/MenuLink';
import { TokenInfo } from './Token/TokenInfo';
import { useTokenBalance } from '@/hooks/useTokenBalance';
import { useNativeBalance } from '@/hooks/useNativeBalance';
import { activeChain, activeChainId } from '@/config/chain';
import { ellipseAddress } from '@/utils/addressHelper';
import { CONTRACTS } from '@/config/constants/contracts';
import maticLogo from '@/app/assets/images/matic.png';
import usdtLogo from '@/app/assets/images/usdt.png';
import styles from './WalletMenu.module.scss';

type WalletMenuProps = {
    address: Address,
    onClose?: () => void
}

export function WalletMenu({ address, onClose }: WalletMenuProps) {
    const { disconnectAsync } = useDisconnect();

    const usdtBalance = useTokenBalance(
        CONTRACTS.usdt[activeChainId].address,
        CONTRACTS.usdt[activeChainId].decimals
    );
    const maticBalance = useNativeBalance(address);

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

                <MenuLink
                    text='Swap TANP'
                    iconSlot={<Swap />}
                />

                <MenuLink
                    text='Buy USDT'
                    iconSlot={<Buy />}
                />
            </div>

            <div className={styles.footer}>
                <Button
                    view='danger'
                    iconSlot={<Logout />}
                    onClick={() => disconnectAsync()}
                >
                    Log out
                </Button>
            </div>
        </div>
    );
}