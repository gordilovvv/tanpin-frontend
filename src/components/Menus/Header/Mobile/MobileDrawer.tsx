import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, LazyMotion, domMax, motion } from 'framer-motion';
import { Button } from '@/uikit';
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
    close: () => void
}

export function MobileDrawer({ isOpen, close }: MobileDrawerProps) {
    const animationRef = useRef<HTMLDivElement>(null);
    const location = useLocation();

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        const resizeHandler = ({ target }: Event) => {
            if ((target as Window).innerWidth > MEDIA_SIZES.phone) {
                close();
            }
        };

        window.addEventListener('resize', resizeHandler);

        return () => window.removeEventListener('resize', resizeHandler);
    }, [isOpen]);

    useEffect(() => {
        if (isOpen) {
            close();
        }
    }, [location]);

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
                    <div className={styles.content}>
                        <Button block>
                            Connect wallet
                        </Button>

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
                </motion.div>}
            </AnimatePresence>
        </LazyMotion>,
        document.body);
}