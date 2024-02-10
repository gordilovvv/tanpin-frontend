
import { CSSProperties, useCallback, useEffect, useRef, useState } from 'react';
import { Spin, Logo, Button } from '@/uikit';
import { AuthContainer } from '@/components/Layout';
import { useConnect } from 'wagmi';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAccount } from '@/states/user/hooks/useAccount';
import { useWalletAuthenticator } from '@/states/user/hooks/useAuth';
import { LoadingStatus } from '@/states/user/hooks/useWalletSignature';
import { useTranslation } from '@/localization';
import { TELEGRAM_BOT_URL } from '@/config';
import { activeChainId } from '@/config/chain';
import { telegramConnector } from '@/config/wagmi';
import { logError } from '@/utils/sentry';
import styles from './TelegramAuthView.module.scss';

enum Stage {
    CONNECTED,
    LOADING,
    FAILED
}

export function TelegramAuthView() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { address, isConnected } = useAccount();
    const { connectAsync } = useConnect();
    const [searchParams] = useSearchParams();
    const connecting = useRef(false);
    const [stage, setStage] = useState(address ? Stage.CONNECTED : Stage.LOADING);
    const { authenticateWithServer, status } = useWalletAuthenticator();
    const [isAuthenticateLoading, setIsAuthenticateLoading] = useState(false);

    const handleLogin = async () => {
        if (address) {
            return;
        }

        try {
            const queryParams = searchParams.toString();

            // TODO: После миграций на wagmi 2.0 проверить
            await telegramConnector.loginWithTelegram({
                authQuery: queryParams
            });

            // Таймаут чтобы резко не прыгало ничего
            await new Promise<void>(r => setTimeout(r, 600));

            await connectAsync({
                chainId: activeChainId,
                connector: telegramConnector
            });

            setStage(Stage.CONNECTED);
        } catch (error) {
            setStage(Stage.FAILED);
            logError(error);
        } finally {
            connecting.current = false;
        }
    };

    // TODO: Убрать после обновления авторизации на беке, скорее всего просто уберем accessToken
    // Это быстрый фикс под авторизацию, чтобы не показывать модалку подписи после входа по Телеге
    const handleAuthenticate = useCallback(async () => {
        if (status === LoadingStatus.IDLE && !isConnected) {
            setIsAuthenticateLoading(true);

            await authenticateWithServer();

            setIsAuthenticateLoading(false);
        }

        navigate('/');
    }, [navigate, authenticateWithServer, setIsAuthenticateLoading, status, isConnected]);

    // Auto-connect
    useEffect(() => {
        if (connecting.current) {
            return;
        }

        connecting.current = true;
        handleLogin();
    }, []);

    const renderContent = useCallback(() => {
        if (stage === Stage.CONNECTED) {
            return (
                <div className={styles.content}>
                    <div className={styles.title}>
                        {t('Ready to Go!')}
                    </div>

                    <div className={styles.button}>
                        <Button
                            loading={isAuthenticateLoading}
                            onClick={handleAuthenticate}
                        >
                            {t('Explore Tanpin')}
                        </Button>
                    </div>
                </div>
            );
        }

        if (stage === Stage.FAILED) {
            return (
                <div className={styles.content}>
                    <div className={styles.title}>
                        {t('Authorization failed')}
                    </div>

                    <div className={styles.description}>
                        {t('Oops! Something went wrong.')}<br /> {t('Give it another shot later!')}
                    </div>

                    <div className={styles.button}>
                        <Button
                            as='a'
                            href={TELEGRAM_BOT_URL}
                            rel="noreferrer noopener"
                        >
                            {t('Try again')}
                        </Button>

                        <Button
                            view='secondary'
                            to='/'
                        >
                            {t('Go home')}
                        </Button>
                    </div>
                </div>
            );
        }

        return (
            <div className={styles.content}>
                <div className={styles.title}>
                    {t('Connecting through Telegram')}
                </div>

                <div className={styles.description}>
                    {t('Please don’t refresh this page')}
                </div>

                <Spin
                    size={'m'}
                    style={{
                        '--spin-fill': 'var(--color-primary-35)',
                        '--spin-active': 'var(--color-primary)',
                        borderWidth: '5px'
                    } as CSSProperties}
                />
            </div>
        );
    }, [stage, isAuthenticateLoading, handleAuthenticate]);

    return (
        <AuthContainer>
            <Logo className={styles.logo} />

            {renderContent()}
        </AuthContainer>
    );
}