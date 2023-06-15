import { useCallback, useState } from 'react';
import { Modal, ModalBody, ModalHead, ModalProps } from '@/uikit';
import { ErrorMessageModal } from '..';
import { NetworkSwitch } from './Switch/NetworkSwitch';
import { useOpenedState } from '@/hooks/useOpenedState';

export function WrongNetworkModal({ isOpen, onClose }: ModalProps) {
    const errorMessage = useOpenedState();
    const [error, setError] = useState<string | undefined>();

    const handleError = useCallback((error: string | undefined) => {
        onClose?.();
        setError(error);
        errorMessage.open();
    }, [onClose, setError, errorMessage.open]);

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalHead title='Wrong network' />

                <ModalBody>
                    <NetworkSwitch
                        onError={handleError}
                        onClose={onClose}
                    />
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