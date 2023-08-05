import { formatERC1155Amount } from '@/utils/formatTokenAmount';

type TokenStockProps = {
    available: number,
    supply: number
}

export function TokenStock({ available, supply }: TokenStockProps) {
    const isLimitedToken = supply !== 0;
    const formattedAvailable = formatERC1155Amount(available, 'en');

    if (isLimitedToken) {
        const formattedSupply = formatERC1155Amount(supply, 'en');

        return (
            <>
                <span>{formattedAvailable}</span> / {formattedSupply} available
            </>
        );
    }

    return (<>
        <span>{formattedAvailable}</span> editions
    </>);
}