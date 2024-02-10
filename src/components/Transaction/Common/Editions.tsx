import { useTranslation } from '@/localization';
import { formatERC1155Amount } from '@/utils/formatTokenAmount';
import { editionsPurchaseSuffix, editionsSuffix, pluralize } from '@/utils/pluralize';

type EditionsProps = {
    num: number,
    isPurchase?: boolean
}

export function Editions({ num, isPurchase }: EditionsProps) {
    const { locale } = useTranslation();
    const suffixes = isPurchase ? editionsPurchaseSuffix : editionsSuffix;

    if (num === 1) {
        return (<>{num} {pluralize(num, locale, suffixes)}</>);
    }

    return (<>{formatERC1155Amount(num, locale)} {pluralize(num, locale, suffixes)}</>);
}