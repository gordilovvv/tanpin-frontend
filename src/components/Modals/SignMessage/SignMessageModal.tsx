import { useCallback, useState } from 'react';
import { Modal, ModalBody, ModalHead, ModalProps } from '@/uikit';
import { SignMessageBody } from './Body/SingMessageBody';

export function SignMessageModal({ isOpen }: ModalProps) {
    const [error, setError] = useState<string | undefined>();

    const handleRetry = useCallback(() => {
        setError(undefined);
    }, [setError]);

    return (
        <Modal isOpen={isOpen}>
            <ModalHead title={error ? 'Error' : 'Connecting Wallet'} />

            <ModalBody>
                <SignMessageBody
                    onRetry={handleRetry}
                    onError={setError}
                />
            </ModalBody>
        </Modal>

    );
}