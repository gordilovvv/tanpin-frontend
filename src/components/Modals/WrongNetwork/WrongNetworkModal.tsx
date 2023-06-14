import { Button, Modal, ModalBody, ModalHead, ModalProps } from '@/uikit';
import styles from './WrongNetworkModal.module.scss';
import { useSwitchNetwork } from '@/hooks/useSwitchNetwork';
import { activeChainId } from '@/config/chain';
import { ErrorMessageModal } from '..';
import { useOpenedState } from '@/hooks/useOpenedState';
import { useEffect } from 'react';

type WrongNetworkModalProps = {
    currentChain: string
    supportedChain: string
}

export function WrongNetworkModal({ isOpen, currentChain, supportedChain, onClose }: ModalProps & WrongNetworkModalProps) {
    const errorMessage = useOpenedState();
    const { switchNetworkAsync, canSwitch, error, isLoading } = useSwitchNetwork();

    useEffect(() => {
        if (error) {
            onClose?.();
            errorMessage.open();
        }
    }, [error]);

    const handleSwitchNetwork = async () => {
        const chain = await switchNetworkAsync(activeChainId);

        if (chain) {
            onClose?.();
        }
    };
    
    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalHead title='Wrong network' />

                <ModalBody>
                    <div className={styles.body}>
                        <div className={styles.text}>
                            You are connected to <span>{currentChain} Network</span>. To prevent possible errors, connect to <span>{supportedChain} Network</span>
                        </div>

                        <div className={styles.buttons}>
                            {canSwitch && <Button
                                view='primary'
                                loading={isLoading}
                                onClick={handleSwitchNetwork}
                            >
                                Switch network
                            </Button>}

                            <Button
                                view='secondary'
                                onClick={onClose}
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                </ModalBody>
            </Modal>

            <ErrorMessageModal
                isOpen={errorMessage.isOpen}
                error={error}
                onClose={errorMessage.close}
            />
        </>
    );
}