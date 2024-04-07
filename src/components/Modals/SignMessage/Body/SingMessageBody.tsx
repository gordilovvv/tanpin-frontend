import { useEffect } from 'react';
import { Button } from '@/uikit';
import { useAuth, useWalletAuthenticator } from '@/states/user/hooks/useAuth';
import { useAccount } from '@/states/user/hooks/useAccount';
import { LoadingStatus } from '@/states/user/hooks/useWalletSignature';
import { useTranslation } from '@/localization';
import lottieImg from '@/app/assets/images/lottie.gif';
import styles from './SignMessageBody.module.scss';

type SignMessageBodyProps = {
    onError: (error: string) => void,
    onRetry: () => void
}

export function SignMessageBody({ onError, onRetry }: SignMessageBodyProps) {
    const { t } = useTranslation();
    const { logout } = useAuth();
    const { connector } = useAccount();
    const { authenticateWallet, reset, status, error } = useWalletAuthenticator();

    useEffect(() => {
        if (status === LoadingStatus.IDLE && connector) {
            authenticateWallet();
        }
    }, [status, connector]);

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
                        {t('Try again')}
                    </Button>

                    <Button
                        view='secondary'
                        onClick={logout}
                    >
                        {t('Cancel')}
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
                {t('Sign the message with your wallet')}
            </div>

            <Button
                view='secondary'
                onClick={logout}
            >
                {t('Cancel')}
            </Button>
        </div>
    );
}