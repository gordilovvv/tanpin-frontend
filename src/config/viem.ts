import { createPublicClient, fallback, http } from 'viem';
import { PUBLIC_NODES, activeChain } from './chain';

export const clientTransport = fallback(
    (PUBLIC_NODES[activeChain.id] as string[]).map((url) =>
        http(url, {
            timeout: 15_000,
        }),
    ),
    {
        rank: false
    },
);

export const viemClient = createPublicClient({
    chain: activeChain,
    transport: clientTransport,
    batch: {
        multicall: {
            batchSize: 1024 * 200
        },
    },
});