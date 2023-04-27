import { PropsWithChildren, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, LazyMotion, domMax, motion } from 'framer-motion';
import { clearAllBodyScrollLocks, disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { ModalContext, ModalState } from './Context';
import styles from './Modal.module.scss';

const getPortalRoot = () => {
    return typeof window !== 'undefined' && (document.getElementById('modal-elements') ?? document.body);
};

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

const animationMap = {
    initial: 'initial',
    animate: 'animate',
    exit: 'exit',
};

const animationVariants = {
    initial: { transform: 'translate(0, 0)' },
    animate: { transform: 'translate(0, 0)' },
    exit: { transform: 'translate(0, 0)' },
};

export type ModalProps = {
    isOpen: boolean,
    onClose?: () => void,
    closeOnOverlayClick?: boolean
}

export function Modal({ isOpen, onClose, closeOnOverlayClick = true, children }: PropsWithChildren<ModalProps>) {
    const portal = getPortalRoot();
    const animationRef = useRef<HTMLDivElement>(null);
    const scrollableBodyRef = useRef<HTMLDivElement>(null);

    const contextProvider: ModalState = {
        isOpen,
        close: onClose,
        bodyRef: scrollableBodyRef
    };

    const handleOverlayClick = () => {
        if (closeOnOverlayClick) {
            onClose?.();
        }
    };

    useEffect(() => {
        if (isOpen) {
            const handleKeydown = (event: KeyboardEvent) => {
                if (event.key === 'Escape') {
                    onClose?.();
                }
            };

            window.addEventListener('keydown', handleKeydown);

            return () => window.removeEventListener('keydown', handleKeydown);
        }
    }, [isOpen]);

    useEffect(() => {
        if (!scrollableBodyRef.current) {
            return;
        }

        if (isOpen) {
            disableBodyScroll(scrollableBodyRef.current);

            return () => {
                if (scrollableBodyRef.current) {
                    enableBodyScroll(scrollableBodyRef.current);
                } else {
                    return clearAllBodyScrollLocks();
                }
            };
        } else {
            enableBodyScroll(scrollableBodyRef.current);
        }
    }, [isOpen, scrollableBodyRef.current]);

    if (portal) {
        return createPortal(
            <ModalContext.Provider value={contextProvider}>
                <LazyMotion features={domMax}>
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                ref={animationRef}
                                className={styles.modal}
                                onAnimationStart={() => animationHandler(animationRef.current)}
                                {...animationMap}
                                variants={animationVariants}
                                transition={{ duration: 0.35 }}
                            >
                                <div
                                    className={styles.overlay}
                                    onClick={handleOverlayClick}
                                />

                                <div className={styles.box}>
                                    {children}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </LazyMotion>
            </ModalContext.Provider>,
            portal
        );
    }

    return null;
}

