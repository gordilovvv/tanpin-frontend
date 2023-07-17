import { CloseAuctionButton } from '@/components/Nft';
import { useUpdateActivity } from '@/states/activity/hooks/useUpdateActivity';
import { ActivityType } from '@/states/activity/types';

type AuctionActionProps = {
    auctionID: string
    activityID: string
    activityType: ActivityType
}

export function AuctionAction({ auctionID, activityID, activityType }: AuctionActionProps) {
    const updateActivity = useUpdateActivity();

    const handleSuccess = () => {
        updateActivity(activityID, {
            doneAuctionAction: true
        });
    };

    if (activityType === ActivityType.WON_AUCTION) {
        return (
            <CloseAuctionButton
                view='secondary'
                auctionID={auctionID}
                text='Claim NFT'
                loadingText='Please confirm the transaction in your wallet to claim the NFT.'
                pendingTransactionText='NFT claim is successfully initiated. Updates will appear as soon as the transaction is confirmed.'
                onSuccess={handleSuccess}
            />
        );
    }

    if (activityType === ActivityType.CLOSE_AUCTION) {
        return (
            <CloseAuctionButton
                view='secondary'
                auctionID={auctionID}
                text='Claim reward'
                loadingText='Please confirm the transaction in your wallet to claim the auction reward.'
                pendingTransactionText='Auction reward claim is successfully initiated. Updates will appear as soon as the transaction is confirmed.'
                onSuccess={handleSuccess}
            />
        );
    }

    if (activityType === ActivityType.LOST_AUCTION) {
        return (
            <CloseAuctionButton
                view='secondary'
                auctionID={auctionID}
                text='Take bids back?'
                loadingText='Please confirm the transaction in your wallet to take your money back.'
                pendingTransactionText='Money retrieval is successfully initiated. Updates will appear as soon as the transaction is confirmed.'
                onSuccess={handleSuccess}
            />
        );
    }

    return null;
}