import { useCallback } from 'react';
import { useAccount, useSignMessage } from 'wagmi';
import { useUserStore } from '../store';
import { loginWeb3 } from '../fetch/loginWeb3';
import { POLICY_URL, TERMS_URL } from '@/config';

/**
 * User sign message because we want to securely prove control of a specific address. Then we receive accessToken from server.
 */
export function useWalletSignature() {
    const message = `I accept the Tanpin Terms of Service ${TERMS_URL} and Privacy Policy ${POLICY_URL}.`;
    const setUser = useUserStore(state => state.setUser);
    const hasAccessToken = useUserStore(state => !!state.accessToken);

    const { address, connector } = useAccount();
    const { error: errorWagmi, isLoading, isSuccess, signMessageAsync: signMessageWagmi, reset } = useSignMessage({
        message
    });

    const error = errorWagmi?.message;
    const canSign = !!address && !isLoading && !isSuccess && !hasAccessToken;

    // TODO: add nonce to message
    // const genRanHex = (size) =>
    //   [...Array(size)]
    //   .map(() => Math.floor(Math.random() * 16).toString(16))
    //   .join('');
    // const nonce = genRanHex(32);
    const signLoginMessage = useCallback(async () => {
        try {
            if (!connector) {
                return;
            }

            if (!canSign) {
                throw new Error('Sign message is not ready');
            }

            const signature = await signMessageWagmi();
            const { accessToken, rulesAccept } = await loginWeb3({
                address,
                message,
                signature
            });

            setUser(
                accessToken,
                rulesAccept
            );
        } catch (error) {
            console.error(error);
        }
    }, [setUser, signMessageWagmi, address, canSign, connector]);

    return {
        error,
        canSign,
        reset,
        signLoginMessage
    };
}