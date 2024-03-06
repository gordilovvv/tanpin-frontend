type CurrencyChainProps = {
    chain: string,
    full?: boolean
}

export function CurrencyChain({ chain, full }: CurrencyChainProps) {
    if (chain === 'polygon') {
        return <>Polygon</>;
    }

    if (chain === 'ethereum') {
        return full ? <>Ethereum (ERC20)</> : <>ERC20</>;
    }

    if (chain === 'bsc') {
        return full ? <>BSC (BEP20)</> : <>BEP20</>;
    }

    if (chain === 'tron') {
        return full ? <>Tron (TRC20)</> : <>TRC20</>;
    }

    return null;
}