import { useTranslation } from '@/localization';
import { formatERC1155Amount } from '@/utils/formatTokenAmount';
import { editionsSuffix, pluralize } from '@/utils/pluralize';

type TokenStockProps = {
    available: number,
    supply: number
}

export function TokenStock({ available, supply }: TokenStockProps) {
    const { t, locale } = useTranslation();
    const isLimitedToken = supply !== 0;
    const formattedAvailable = formatERC1155Amount(available, locale);

    if (isLimitedToken) {
        const formattedSupply = formatERC1155Amount(supply, locale);

        return (
            <>
                <span>{formattedAvailable}</span> / {formattedSupply} {t('available')}
            </>
        );
    }

    return (<>
        <span>{formattedAvailable}</span> {pluralize(available, locale, editionsSuffix)}
    </>);
}