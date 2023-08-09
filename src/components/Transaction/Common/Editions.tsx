import { formatERC1155Amount } from '@/utils/formatTokenAmount';

type EditionsProps = {
    num: number
}

export function Editions({ num }: EditionsProps) {
    if (num === 1) {
        return (<>{num} edition</>);
    }

    return (<>{formatERC1155Amount(num, 'en')} editions</>);
}