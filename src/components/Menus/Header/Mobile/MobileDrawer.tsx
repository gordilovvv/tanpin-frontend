import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, LazyMotion, domMax, motion } from 'framer-motion';
import { Button } from '@/uikit';
import { ConnectWalletButton } from '../../ConnectWalletButton/ConnectWalletButton';
import { WalletButton } from '../../WalletButton/WalletButton';
import { WalletMenu } from '../../WalletMenu/WalletMenu';
import { useOpenedState } from '@/hooks/useOpenedState';
import { Address } from 'wagmi';
import { headerLinks } from '../../config';
import { MEDIA_SIZES } from '@/config/constants';
import { socialsList } from '@/config/constants/socials';
import styles from './MobileDrawer.module.scss';

const animationHandler = (element: HTMLElement | null) => {
    if (!element) {
        return;
    }

    if (element.classList.contains('appear')) {
        element.classList.remove('appear');
        element.classList.add('disappear');
    } else {
        element.classList.remove('disappear');
        element.classList.add('appear');
    }
};

const animationVariants = {
    initial: { transform: 'translate(100%, 0)' },
    animate: { transform: 'translate(0, 0)' },
    exit: { transform: 'translate(100%, 0)' },
};

const animationMap = {
    initial: 'initial',
    animate: 'animate',
    exit: 'exit',
};

type MobileDrawerProps = {
    isOpen: boolean,
    address?: Address,
    isConnected: boolean,
    close: () => void
}

export function MobileDrawer({ isOpen, address, isConnected, close }: MobileDrawerProps) {
    const location = useLocation();
    const animationRef = useRef<HTMLDivElement>(null);
    const walletMenuState = useOpenedState();

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        const resizeHandler = ({ target }: Event) => {
            if ((target as Window).innerWidth > MEDIA_SIZES.phone) {
                handleClose();
            }
        };

        window.addEventListener('resize', resizeHandler);

        return () => window.removeEventListener('resize', resizeHandler);
    }, [isOpen]);

    useEffect(() => {
        if (isOpen) {
            handleClose();
        }
    }, [location]);

    const handleClose = () => {
        close();
        walletMenuState.close();
    };

    const renderContent = () => {
        if (walletMenuState.isOpen && address) {
            return (
                <WalletMenu
                    address={address}
                    onClose={walletMenuState.close}
                />
            );
        } else {
            return (
                <div className={styles.content}>
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
    };

    return createPortal(
        <LazyMotion features={domMax}>
            <AnimatePresence>
                {isOpen && <motion.div
                    className={styles.drawer}
                    ref={animationRef}
                    onAnimationStart={() => animationHandler(animationRef.current)}
                    {...animationMap}
                    variants={animationVariants}
                    transition={{ duration: 0.3, ease: [0.46, 0.32, 0.2, 0.9] }}
                >

                    {renderContent()}
                </motion.div>}
            </AnimatePresence>
        </LazyMotion>,
        document.body
    );
}