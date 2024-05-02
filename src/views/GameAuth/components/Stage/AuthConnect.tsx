import { useCallback, useEffect, useState } from 'react';
import { Button } from '@/uikit';
import { ErrorMessageModal } from '@/components/Modals';
import { Arrow } from './Arrow';
import { useTranslation } from '@/localization';
import { useSearchParams } from 'react-router-dom';
import { useWalletSignature } from '@/states/user/hooks/useWalletSignature';
import { loginToGame } from '@/states/user/fetch/loginToGame';
import { AxiosError } from 'axios';

type AuthConnectProps = {
    gameID: string
    gameName: string
    onWalletLinked: () => void
}

export function AuthConnect({ gameID, gameName, onWalletLinked }: AuthConnectProps) {
    const { t } = useTranslation();
    const { signMessage, loading, error, reset } = useWalletSignature();
    const [searchParams] = useSearchParams();
    const [loadedUrlParams, setLoadedUrlParams] = useState<{ key: string, hash: string } | undefined>();

    useEffect(() => {
        const key = searchParams.get('key');
        const hash = searchParams.get('hash');

        if (key && hash) {
            setLoadedUrlParams({ key, hash });
        }
    }, [searchParams, setLoadedUrlParams]);

    const handleConnect = useCallback(() => {
        if (!loadedUrlParams?.key || !loadedUrlParams?.hash) {
            throw new Error('loadedUrlParams are invalid');
        }

        const key = loadedUrlParams.key;
        const hash = loadedUrlParams.hash;

        signMessage({
            text: `I want link my wallet with ${gameName}`,
            onSignature: async ({ address, message, signature }) => {
                try {
                    await loginToGame({
                        gameID,
                        userKey: key,
                        address,
                        message,
                        signature,
                        hash
                    });

                    onWalletLinked();
                } catch (error) {
                    if (error instanceof AxiosError && error.response?.data.error) {
                        throw new Error(error.response?.data.error);
                    } else {
                        throw error;
                    }
                }
            }
        });
    }, [gameID, gameName, loadedUrlParams, signMessage, onWalletLinked]);

    return (
        <>
            <Button
                disabled={!loadedUrlParams}
                loading={loading}
                iconSlot={<Arrow />}
                onClick={handleConnect}
            >
                {loadedUrlParams ? t('Link wallet') : t('Wrong URL')}
            </Button>

            <ErrorMessageModal
                isOpen={!!error}
                error={error}
                onClose={() => reset()}
            />
        </>
    );
}