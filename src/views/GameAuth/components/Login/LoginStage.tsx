import { useCallback, useMemo, useState } from 'react';
import { WalletButton, WalletDocsButton } from '@/components/Wallet';
import { Button, UnstyleLink } from '@/uikit';
import { ErrorMessageModal } from '@/components/Modals';
import { useAuth } from '@/states/user/hooks/useAuth';
import { useAccount } from '@/states/user/hooks/useAccount';
import { useWalletSignature } from '@/states/user/hooks/useWalletSignature';
import { TERMS_URL } from '@/config';
import { ConnectorNames, createWallets } from '@/config/wallet';
import { sortWallets } from '@/utils/sortWallets';
import { connectGame } from '@/states/user/fetch/connectGame';
import styles from './LoginStage.module.scss';

type LoginStageProps = {
    gameHash: string,
    gameValue: string,
    onSuccess: () => void
}

export function LoginStage({ gameHash, gameValue, onSuccess }: LoginStageProps) {
    const { login } = useAuth();
    const { address } = useAccount();
    const wallets = useMemo(() => createWallets(), []);
    const sortedWallets = useMemo(() => sortWallets(wallets), [wallets]);
    const { signMessage, reset, error, loading } = useWalletSignature();
    const [connectError, setConnectError] = useState<string | undefined>();

    const handleSign = () => {
        signMessage({
            text: `I want to connect my wallet to the NFTGTA game and accept Terms of Service ${TERMS_URL}`,
            onSignature: async ({ address, message, signature }) => {
                await connectGame({
                    gameHash,
                    gameValue,
                    address,
                    message,
                    signature
                });

                onSuccess();
            }
        });
    };

    const handleLogin = useCallback(async (id: ConnectorNames) => {
        try {
            await login(id);
        } catch (error) {
            setConnectError((error as Error).message as string);
        }
    }, [login, setConnectError]);

    return (
        <div className={styles.wrap}>
            <div className={styles.title}>
                Authorize a game
            </div>

            <div className={styles.text}>
                Log in to Tanpin using your wallet to connect it with <span>NFTGTA</span> Your NFTs from the wallet will appear in the game
            </div>

            {address ?
                <div className={styles.body}>
                    <Button
                        loading={loading}
                        onClick={handleSign}
                    >
                        Connect NFTGTA
                    </Button>
                </div>
                : <div className={styles.body}>
                    <div className={styles.list}>
                        <WalletDocsButton />

                        <div className={styles.wallets}>
                            {sortedWallets.map(wallet => <WalletButton
                                key={wallet.id}
                                wallet={wallet}
                                onConnect={() => handleLogin(wallet.connectorId)}
                            />)}
                        </div>
                    </div>

                    <div className={styles.terms}>
                        By proceeding you agree with our <UnstyleLink
                            href={TERMS_URL}
                            rel='noreferrer noopener'
                            target='_blank'
                            className={styles.link}
                        >Terms</UnstyleLink>
                    </div>
                </div>}

            <ErrorMessageModal
                isOpen={!!error}
                error={error}
                onClose={() => reset()}
            />

            <ErrorMessageModal
                isOpen={!!connectError}
                error={connectError}
                onClose={() => setConnectError(undefined)}
            />
        </div>
    );
}