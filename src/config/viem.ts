import { createPublicClient, fallback, http } from 'viem';
import { PUBLIC_NODES, activeChain } from './chain';

export const viemClient = createPublicClient({
    chain: activeChain,
    transport: fallback(
        (PUBLIC_NODES[activeChain.id] as string[]).map((url) =>
            http(url, {
                timeout: 15_000,
            }),
        ),
        {
            rank: false
        },
    ),
    batch: {
        multicall: {
            batchSize: 1024 * 200
        },
    },
});