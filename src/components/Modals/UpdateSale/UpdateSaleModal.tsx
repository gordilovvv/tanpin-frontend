import { useCallback, useState } from 'react';
import { Modal, ModalBody, ModalHead, ModalProps } from '@/uikit';
import { UpdateSaleBody } from './Body/UpdateSaleBody';
import { ErrorMessageModal } from '..';

type UpdateSaleModalProps = {
    saleID: string
    onError?: (error: string) => void
    onSuccess?: () => void
} & ModalProps;

export function UpdateSaleModal({ isOpen, saleID, onClose, onSuccess }: UpdateSaleModalProps) {
    const [transactionError, setTransactionError] = useState<string | undefined>();

    const handleError = useCallback((error: string) => {
        onClose?.();
        setTransactionError(error);
    }, [onClose, setTransactionError]);

    const handleSuccess = useCallback(() => {
        onClose?.();
        onSuccess?.();
    }, [onClose, onSuccess]);

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalHead title='Change price' />

                <ModalBody>
                    <UpdateSaleBody
                        saleID={saleID}
                        onError={handleError}
                        onSuccess={handleSuccess}
                    />
                </ModalBody>
            </Modal>

            <ErrorMessageModal
                isOpen={!!transactionError}
                error={transactionError}
                onClose={() => setTransactionError(undefined)}
            />
        </>
    );
}