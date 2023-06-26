import { useMemo } from 'react';
import { CardButton } from './Button/CardButton';
import { CardProperties } from './Properties/CardProperties';
import { findBestNFTOffer } from '@/utils/nft';
import { MultipleNFT, NFTSaleStatus } from '@/states/types';

type NftMultipleProps = {
    nft: MultipleNFT
    buttonClass?: string
}

export function NftMultiple({ nft, buttonClass }: NftMultipleProps) {
    const bestOffer = useMemo(() => {
        return findBestNFTOffer(nft.owners);
    }, [nft.owners]);

    return (
        <>
            {bestOffer.status === NFTSaleStatus.NOT_FOR_SALE
                ? <CardProperties
                    type='multipleNFT'
                    status={bestOffer.status}
                />
                : <CardProperties
                    type='multipleNFT'
                    price={bestOffer.offer.price}
                    currency={bestOffer.offer.currency}
                    auctionEndDate={bestOffer.offer.auctionEndDate}
                    status={bestOffer.status}
                />}

            {bestOffer.status !== NFTSaleStatus.NOT_FOR_SALE && <CardButton
                status={bestOffer.status}
                nftID={nft.ID}
                collectionID={nft.collection.ID}
                gameID={nft.collection.game.ID}
                className={buttonClass}
            />}
        </>
    );
}