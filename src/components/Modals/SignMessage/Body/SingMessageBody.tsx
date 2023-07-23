import { useEffect } from 'react';
import { Button } from '@/uikit';
import { useAuth } from '@/states/user/hooks/useAuth';
import { useAccount } from '@/states/user/hooks/useAccount';
import { useUserStore } from '@/states/user/store';
import { LoadingStatus, useWalletSignature } from '@/states/user/hooks/useWalletSignature';
import { loginWeb3 } from '@/states/user/fetch/loginWeb3';
import { POLICY_URL, TERMS_URL } from '@/config';
import lottieImg from '@/app/assets/images/lottie.gif';
import styles from './SignMessageBody.module.scss';

type SignMessageBodyProps = {
    onError: (error: string) => void,
    onRetry: () => void
}

export function SignMessageBody({ onError, onRetry }: SignMessageBodyProps) {
    const setUser = useUserStore(state => state.setUser);
    const { logout } = useAuth();
    const { connector } = useAccount();
    const { signMessage, reset, error, status } = useWalletSignature();

    useEffect(() => {
        if (status === LoadingStatus.IDLE && connector) {
            signMessage({
                text: `I accept the Tanpin Terms of Service ${TERMS_URL} and Privacy Policy ${POLICY_URL}.`,
                onSignature: async ({ address, message, signature }) => {
                    const { accessToken, rulesAccept } = await loginWeb3({
                        address,
                        message,
                        signature
                    });

                    setUser(accessToken, rulesAccept);
                }
            });
        }
    }, [status, connector, signMessage]);

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