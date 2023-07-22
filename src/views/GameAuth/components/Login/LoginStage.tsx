import styles from './LoginStage.module.scss';
import { HOW_TO_CREATE_WALLET_INSTRUCTION_URL } from '@/config/constants';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { WalletConfig, createWallets } from '@/config/wallet';
import { useAuth } from '@/states/user/hooks/useAuth';
import { Button, Logo, UnstyleLink, useToast } from '@/uikit';
import { WalletButton } from '@/components/Menus/ConnectWalletModal/WalletButton/WalletButton';
import { useUserStore } from '@/states/user/store';
import { useAccount } from '@/states/user/hooks/useAccount';
import { useSignMessage } from 'wagmi';
import { walletErrorToUserReadableMessage } from '@/utils/walletErrorToUserReadableMessage';
import { POLICY_URL, TERMS_URL } from '@/config';
import { api } from '@/app/api';
import { times } from 'lodash';

function randomHex(size: number) {
    return times(size)
        .map(() => Math.floor(Math.random() * 16).toString(16))
        .join('');
}

export enum LoadingStatus {
    IDLE = 'IDLE',
    LOADING = 'loading',
    SUCCESS = 'success',
    FAIL = 'fail'
}

/**
 * Хук подписи сообщения входа, для того чтобы убедиться что юзер действительно владеет кошельком. Бекенд проверит подпись и будет уверен, что это истинный владелец.
 */
export function useWalletSignature() {
    const { address, connector } = useAccount();
    const { signMessageAsync: signMessageWagmi, reset: resetWagmi } = useSignMessage();
    const isLoading = useRef<boolean>(false);
    const isPreparing = address && !connector;
    const { toastDanger } = useToast();
    const [error, setError] = useState<string | undefined>();
    const [status, setStatus] = useState<LoadingStatus>(LoadingStatus.IDLE);

    const signLoginMessage = async (key: string, hash: string) => {
        try {
            if (isLoading.current) {
                return;
            }

            if (!address || !connector) {
                throw new Error('signMessage called unnecessary!');
            }

            isLoading.current = true;

            const nonce = randomHex(32);
            const message = `I accept the Tanpin Terms of Service ${TERMS_URL} and Privacy Policy ${POLICY_URL}. \n\n Nonce: ${nonce}`;

            const signature = await signMessageWagmi({ message });

            await api.post('/game/api/auth.web3', {
                key, // От игры. Передать обратно ей. (Например email игрока)
                hash,
                address,
                message,
                signature
            });

            setStatus(LoadingStatus.SUCCESS);
        } catch (error) {
            setStatus(LoadingStatus.FAIL);
            setError('Login failed!');
            toastDanger(walletErrorToUserReadableMessage(error));
        } finally {
            isLoading.current = false;
        }
    };

    const reset = useCallback(() => {
        resetWagmi();
        setStatus(LoadingStatus.IDLE);
    }, [resetWagmi, setStatus]);

    return {
        isPreparing,
        status,
        error,
        reset,
        signLoginMessage
    };
}


const sortWallets = (wallets: WalletConfig[]) => {
    return [...wallets].sort((a, b) => {
        if (a.installed === b.installed) return 0;

        return a.installed === true ? -1 : 1;
    });
};

type LoginStageProps = {
    keyID: string,
    hash: string,
    onSuccess: () => void
}

// TODO: Refactor
export function LoginStage({ keyID, hash, onSuccess }: LoginStageProps) {
    const { login } = useAuth();
    const { toastDanger } = useToast();
    const { address } = useAccount();
    const wallets = useMemo(() => createWallets(), []);
    const sortedWallets = useMemo(() => sortWallets(wallets), [wallets]);
    const logged = useUserStore(state => !!state.accessToken);
    const { isPreparing, signLoginMessage, status } = useWalletSignature();

    useEffect(() => {
        if (logged && !isPreparing) {
            signLoginMessage(keyID, hash);
        }
    }, [keyID, logged, isPreparing]);

    useEffect(() => {
        if (status === LoadingStatus.SUCCESS) {
            onSuccess();
        }
    }, [status]);

    const handleLogin = async (id: any) => {
        try {
            login(id);
        } catch (error) {
            toastDanger('Login rejected!');
        }
    };

    return (
        <>
            <Logo className={styles.logo} />
            <div className={styles.title}>Authorize a game</div>
            <div className={styles.info}>Log in to Tanpin using your wallet to connect it with <span>NFTGTA</span> Your NFTs from the wallet will appear in the game</div>

            {address ?
                <div className={styles.walletWrap}>
                    <Button onClick={() => signLoginMessage(keyID, hash)}>
                        Login in NFTGTA
                    </Button>
                </div>
                : <div className={styles.walletWrap}>
                    <Button
                        as='a'
                        href={HOW_TO_CREATE_WALLET_INSTRUCTION_URL}
                        rel='noreferrer noopener'
                        target='_blank'
                        view='secondary'
                    >
                        I don’t have a wallet
                    </Button>

                    <div className={styles.list}>
                        {sortedWallets.map(wallet => <WalletButton
                            key={wallet.id}
                            wallet={wallet}
                            onConnect={() => handleLogin(wallet.connectorId)}
                        />)}
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
        </>
    );
}