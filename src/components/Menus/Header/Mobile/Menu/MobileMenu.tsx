import { Address } from 'viem';
import { useOpenedState } from '@/hooks/useOpenedState';
import styles from './MobileMenu.module.scss';
import { WalletMenu } from '@/components/Menus/WalletMenu/WalletMenu';
import { WalletButton } from '@/components/Menus/WalletButton/WalletButton';
import { ConnectWalletButton } from '@/components/Menus/ConnectWalletButton/ConnectWalletButton';
import { NavLink } from 'react-router-dom';
import { headerLinks } from '@/components/Menus/config';
import { socialsList } from '@/config/constants/socials';
import { Button } from '@/uikit';

type MobileMenuProps = {
    address?: Address,
    isConnected: boolean
}

export function MobileMenu({ address, isConnected }: MobileMenuProps) {
    const walletMenuState = useOpenedState();

    if (walletMenuState.isOpen && address) {
        return (
            <WalletMenu
                address={address}
                onClose={walletMenuState.close}
            />
        );
    } else {
        return (
            <div className={styles.wrap}>
                {isConnected
                    ? <WalletButton onClick={walletMenuState.open} />
                    : <ConnectWalletButton />}

                <div className={styles.menu}>
                    {headerLinks.map(link => <NavLink
                        key={link.to}
                        to={link.to}
                        className={styles.menuLink}
                    >
                        {link.text}
                    </NavLink>)}
                </div>

                <div className={styles.socials}>
                    {socialsList.map(social => <Button
                        key={social.name}
                        as='a'
                        view='secondary'
                        href={social.url}
                        rel='noreferrer noopener'
                        target='_blank'
                        iconSlot={<social.icon />}
                    />)}
                </div>
            </div>
        );
    }
}