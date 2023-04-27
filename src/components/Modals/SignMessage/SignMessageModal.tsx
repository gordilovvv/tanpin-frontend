import { Button, Modal, ModalBody, ModalHead, ModalProps } from '@/uikit';
import { useAuth } from '@/states/user/hooks/useAuth';
import { useWalletSignature } from '@/states/user/hooks/useWalletSignature';
import lottieImg from '@/app/assets/images/lottie.gif';
import styles from './SignMessageModal.module.scss';

export function SignMessageModal({ isOpen }: ModalProps) {
    const { logout } = useAuth();
    const { signLoginMessage, reset, error, canSign } = useWalletSignature();

    if (canSign && !error) {
        signLoginMessage();
    }

    const handleCancel = () => {
        logout();
        reset();
    };

    return (
        <>
            <Modal isOpen={isOpen}>
                <ModalHead title={error ? 'Error' : 'Connecting Wallet'} />

                <ModalBody>
                    {!error
                        ? <div className={styles.wrap}>
                            <div className={styles.loader}>
                                <img
                                    src={lottieImg}
                                    alt='loader'
                                />
                            </div>

                            <div className={styles.text}>
                                Sign the message with your wallet
                            </div>

                            <Button
                                view='secondary'
                                onClick={logout}
                            >
                                Cancel
                            </Button>
                        </div>
                        : <div className={styles.wrap}>
                            <div className={styles.error}>
                                {error}
                            </div>

                            <div className={styles.buttons}>
                                <Button onClick={reset}>
                                    Try again
                                </Button>

                                <Button
                                    view='secondary'
                                    onClick={handleCancel}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </div>}
                </ModalBody>
            </Modal>
        </>
    );
}