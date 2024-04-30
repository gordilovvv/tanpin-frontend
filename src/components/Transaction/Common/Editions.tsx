import { useTranslation } from '@/localization';
import { formatERC1155Amount } from '@/utils/formatTokenAmount';

type EditionsProps = {
    num: number
}

export function Editions({ num }: EditionsProps) {
    const { t, locale } = useTranslation();

    if (num === 1) {
        return (<span>({num} {t('pc')})</span>);
    }

    return (<span>({formatERC1155Amount(num, locale)} {t('pcs')})</span>);
}