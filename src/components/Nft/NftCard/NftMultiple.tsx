import { useMemo } from 'react';
import { CardButton } from './Button/CardButton';
import { CardProperties } from './Properties/CardProperties';
import { findBestNFTOffer, findOwnerOffer } from '@/utils/nft';
import { MultipleNFT, NFTSaleStatus } from '@/states/types';
import { isAddressOwner } from '@/utils/addressHelper';
import { Address } from 'viem';
import { NFTBestOffer } from '@/states/nft/types';

type NftMultipleProps = {
    nft: MultipleNFT,
    userAddress?: Address,
    buttonClass?: string
}

export function NftMultiple({ nft, userAddress, buttonClass }: NftMultipleProps) {
    const isSingleOwner = nft.owners.length === 1;
    const isOwner = useMemo(() => {
        if (userAddress) {
            const addresses = nft.owners.map(
                ({ owner }) => owner
            );

            return isAddressOwner(userAddress, addresses);
        }

        return false;
    }, [nft.owners, userAddress]);

    const offer = useMemo<NFTBestOffer>(() => {
        if (isOwner && userAddress) {
            const { sale, auction, status } = findOwnerOffer(nft.owners, userAddress);

            if (status) {
                return {
                    status,
                    offer: {
                        maker: userAddress,
                        sale,
                        auction
                    }
                };
            }
        }

        return findBestNFTOffer(nft.owners);
    }, [nft.owners, isOwner, userAddress]);

    const properties = useMemo(() => {
        const propertiesType = isSingleOwner ? 'singleNFT' : 'multipleNFT';

        if (offer.status === NFTSaleStatus.FIXED_PRICE && offer.offer.sale) {
            const sale = offer.offer.sale;

            return (
                <CardProperties
                    type={propertiesType}
                    price={sale.price.amount}
                    currency={sale.price.currency}
                    status={offer.status}
                />
            );
        }

        if (offer.status === NFTSaleStatus.AUCTION && offer.offer.auction) {
            const auction = offer.offer.auction;

            return (
                <CardProperties
                    type={propertiesType}
                    price={auction.highestBid.amount}
                    currency={auction.highestBid.currency}
                    auctionEndDate={auction.endDate}
                    status={offer.status}
                />
            );
        }

        return (
            <CardProperties
                type={propertiesType}
                status={offer.status}
            />
        );
    }, [offer, isSingleOwner]);

    return (
        <>
            {properties}

            {offer.status !== NFTSaleStatus.NOT_FOR_SALE && !isOwner && <CardButton
                status={offer.status}
                nftID={nft.ID}
                collectionID={nft.collection.ID}
                gameID={nft.collection.game.ID}
                className={buttonClass}
            />}
        </>
    );
}