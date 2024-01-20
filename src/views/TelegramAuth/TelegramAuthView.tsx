
import { CSSProperties, useCallback, useEffect, useRef, useState } from 'react';
import { Spin, Logo, Button } from '@/uikit';
import { AuthContainer } from '@/components/Layout';
import { useConnect } from 'wagmi';
import { useSearchParams } from 'react-router-dom';
import { useAccount } from '@/states/user/hooks/useAccount';
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
    const { address } = useAccount();
    const { connectAsync } = useConnect();
    const [searchParams] = useSearchParams();
    const connecting = useRef(false);
    const [stage, setStage] = useState(address ? Stage.CONNECTED : Stage.LOADING);

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
                        Ready to Go!
                    </div>

                    <div className={styles.button}>
                        <Button to='/'>
                            Explore Tanpin
                        </Button>
                    </div>
                </div>
            );
        }

        if (stage === Stage.FAILED) {
            return (
                <div className={styles.content}>
                    <div className={styles.title}>
                        Authorization failed
                    </div>

                    <div className={styles.description}>
                        Oops! Something went wrong.<br /> Give it another shot later!
                    </div>

                    <div className={styles.button}>
                        <Button
                            as='a'
                            href={TELEGRAM_BOT_URL}
                            rel="noreferrer noopener"
                        >
                            Try again
                        </Button>

                        <Button
                            view='secondary'
                            to='/'
                        >
                            Go home
                        </Button>
                    </div>
                </div>
            );
        }

        return (
            <div className={styles.content}>
                <div className={styles.title}>
                    Connecting through Telegram
                </div>

                <div className={styles.description}>
                    Please don’t refresh this page
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
    }, [stage]);

    return (
        <AuthContainer>
            <Logo className={styles.logo} />

            {renderContent()}
        </AuthContainer>
    );
}