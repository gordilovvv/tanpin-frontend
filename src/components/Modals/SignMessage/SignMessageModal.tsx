import { useCallback, useEffect, useState } from 'react';
import { Modal, ModalBody, ModalHead, ModalProps } from '@/uikit';
import { SignMessageBody } from './Body/SingMessageBody';
import { useTranslation } from '@/localization';

export function SignMessageModal({ isOpen }: ModalProps) {
    const { t } = useTranslation();
    const [error, setError] = useState<string | undefined>();

    useEffect(() => {
        if (!isOpen) {
            setError(undefined);
        }
    }, [isOpen]);

    const handleRetry = useCallback(() => {
        setError(undefined);
    }, [setError]);

    return (
        <Modal isOpen={isOpen}>
            <ModalHead title={t(error ? 'Error' : 'Connecting Wallet')} />

            <ModalBody>
                <SignMessageBody
                    onRetry={handleRetry}
                    onError={setError}
                />
            </ModalBody>
        </Modal>

    );
}