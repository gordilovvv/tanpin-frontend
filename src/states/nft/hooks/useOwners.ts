import { useMemo } from 'react';
import { useNFTStore } from '../store';
import { useAccount } from '@/states/user/hooks/useAccount';
import { isMultipleNFT } from '@/utils/nft';
import { Auction, NFTOwner, Sale } from '@/states/types';

export function useOwners() {
    const { address } = useAccount();
    const nftOwners = useNFTStore(state => {
        return state.nft && isMultipleNFT(state.nft) ? state.nft.owners : undefined;
    });

    return useMemo(() => {
        if (!nftOwners) {
            return [];
        }

        const ownersList: (Omit<NFTOwner, 'sales' | 'auctions'> & {
            sale?: Sale,
            auction?: Auction
        })[] = [];

        for (const { sales, auctions, ...owner } of nftOwners) {
            if (sales.length) {
                for (const sale of sales) {
                    ownersList.push({
                        sale,
                        ...owner
                    });
                }
            } else if (auctions.length) {
                for (const auction of auctions) {
                    ownersList.push({
                        auction,
                        ...owner
                    });
                }
            } else {
                ownersList.push(owner);
            }
        }

        if (address) {
            // Sort the array based on the condition address === addressVar, and then based on the presence of sale or auction.
            ownersList.sort((a, b) => {
                if (a.owner === address && b.owner !== address) {
                    return -1;
                } else if (a.owner !== address && b.owner === address) {
                    return 1;
                } else {
                    const aHasSaleOrAuction = a.sale || a.auction;
                    const bHasSaleOrAuction = b.sale || b.auction;

                    if (aHasSaleOrAuction && !bHasSaleOrAuction) {
                        return -1;
                    } else if (!aHasSaleOrAuction && bHasSaleOrAuction) {
                        return 1;
                    } else {
                        return 0;
                    }
                }
            });
        }

        return ownersList;
    }, [address, nftOwners]);
}