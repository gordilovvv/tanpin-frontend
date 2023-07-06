import { PropsWithChildren, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, LazyMotion, domMax, motion } from 'framer-motion';
import { MEDIA_SIZES } from '@/config/constants';
import styles from './MobileDrawer.module.scss';

//TODO: Отключить скролл у body при открытии мобильного бургера

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

export function MobileDrawer({ isOpen, children, close }: PropsWithChildren<MobileDrawerProps>) {
    const location = useLocation();
    const animationRef = useRef<HTMLDivElement>(null);

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
                    <div className={styles.content}>
                        {children}
                    </div>
                </motion.div>}
            </AnimatePresence>
        </LazyMotion>,
        document.body
    );
}