import { CardButton } from './Button/CardButton';
import { CardProperties } from './Properties/CardProperties';
import { NFTSaleStatus, SingleNFT } from '@/states/types';

type NftSingleProps = {
    nft: SingleNFT
    buttonClass?: string
}

export function NftSingle({ nft, buttonClass }: NftSingleProps) {
    const renderProperties = () => {
        if (nft.status === NFTSaleStatus.NOT_FOR_SALE) {
            return (
                <CardProperties
                    type='singleNFT'
                    status={nft.status}
                />
            );
        }

        if (nft.auction && nft.status === NFTSaleStatus.AUCTION) {
            return (
                <CardProperties
                    type='singleNFT'
                    price={nft.auction.highestBid.amount}
                    currency={nft.auction.highestBid.currency}
                    auctionEndDate={nft.auction.endDate}
                    status={nft.status}
                />
            );
        }

        if (nft.sale && nft.status === NFTSaleStatus.FIXED_PRICE) {
            return (
                <CardProperties
                    type='singleNFT'
                    price={nft.sale.price.amount}
                    currency={nft.sale.price.currency}
                    status={nft.status}
                />
            );
        }

        return null;
    };
    return (
        <>
            {renderProperties()}

            {nft.status !== NFTSaleStatus.NOT_FOR_SALE && <CardButton
                status={nft.status}
                nftID={nft.ID}
                collectionID={nft.collection.ID}
                gameID={nft.collection.game.ID}
                className={buttonClass}
            />}
        </>
    );
}