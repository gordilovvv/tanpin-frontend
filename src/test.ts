import { createPublicClient, webSocket } from 'viem';
import { polygonMumbai } from 'viem/chains';

export function test() {
    const transport = webSocket('wss://polygon-mumbai.g.alchemy.com/v2/nATKt41SSFV02ZZizyLm2r_TTOjpP5w_', {
        key: 'alchemy',
        name: 'Alchemy WebSocket Provider'
    });

    const client = createPublicClient({
        chain: polygonMumbai,
        transport
    });

    client.watchBlockNumber({
        onBlockNumber: (blockNumber) => console.log('BLOCK', blockNumber),
        onError: (error) => console.log(error)
    });
}

test();