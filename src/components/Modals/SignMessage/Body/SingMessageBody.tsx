import { useEffect } from 'react';
import { Button } from '@/uikit';
import { useAuth } from '@/states/user/hooks/useAuth';
import { LoadingStatus, useWalletSignature } from '@/states/user/hooks/useWalletSignature';
import lottieImg from '@/app/assets/images/lottie.gif';
import styles from './SignMessageBody.module.scss';

type SignMessageBodyProps = {
    onError: (error: string) => void,
    onRetry: () => void
}

export function SignMessageBody({ onError, onRetry }: SignMessageBodyProps) {
    const { logout } = useAuth();
    const { signLoginMessage, reset, error, status, isPreparing } = useWalletSignature();

    useEffect(() => {
        if (status === LoadingStatus.IDLE && !isPreparing) {
            signLoginMessage();
        }
    }, [status, isPreparing]);

    useEffect(() => {
        if (error) {
            onError(error);
        }
    }, [error, onError]);

    const handleRetry = () => {
        reset();
        onRetry();
    };

    if (status === LoadingStatus.FAIL) {
        return (
            <div className={styles.wrap}>
                {error && <div className={styles.error}>
                    {error}
                </div>}

                <div className={styles.buttons}>
                    <Button
                        view='primary'
                        onClick={handleRetry}
                    >
                        Try again
                    </Button>

                    <Button
                        view='secondary'
                        onClick={logout}
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.wrap}>
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
    );
}