import { NotForSale } from './NotForSale/NotForSale';
import { DirectSale } from './DirectSale/DirectSale';
import { Auction, NFTSaleStatus, Sale } from '@/states/types';

type SaleActionProps = {
    nftID: string,
    sale?: Sale,
    auction?: Auction,
    status: NFTSaleStatus
}

export function SaleAction({ nftID, sale, auction, status }: SaleActionProps) {
    if (sale && status === NFTSaleStatus.FIXED_PRICE) {
        return (<DirectSale
            nftID={nftID}
            sale={sale}
        />);
    }

    // TODO: ДОБАВИТЬ АУКЦИОН
    if (auction && status === NFTSaleStatus.AUCTION) {
        return (<div>Auction</div>);
    }

    return (<NotForSale />);
}