import { CloseAuctionButton } from '@/components/Nft';
import { useTranslation } from '@/localization';
import { useUpdateActivity } from '@/states/activity/hooks/useUpdateActivity';
import { ActivityType } from '@/states/activity/types';

type AuctionActionProps = {
    auctionID: string
    activityID: string
    activityType: ActivityType
}

export function AuctionAction({ auctionID, activityID, activityType }: AuctionActionProps) {
    const { t } = useTranslation();
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
                text={t('Claim NFT')}
                loadingText={t('Please confirm the transaction in your wallet to claim the NFT.')}
                pendingTransactionText={t('NFT claim is successfully initiated. Updates will appear as soon as the transaction is confirmed.')}
                onSuccess={handleSuccess}
            />
        );
    }

    if (activityType === ActivityType.CLOSE_AUCTION) {
        return (
            <CloseAuctionButton
                view='secondary'
                auctionID={auctionID}
                text={t('Claim reward')}
                loadingText={t('Please confirm the transaction in your wallet to claim the auction reward.')}
                pendingTransactionText={t('Auction reward claim is successfully initiated. Updates will appear as soon as the transaction is confirmed.')}
                onSuccess={handleSuccess}
            />
        );
    }

    if (activityType === ActivityType.LOST_AUCTION) {
        return (
            <CloseAuctionButton
                view='secondary'
                auctionID={auctionID}
                text={t('Take bids back ?')}
                loadingText={t('Please confirm the transaction in your wallet to take your money back.')}
                pendingTransactionText={t('Money retrieval is successfully initiated. Updates will appear as soon as the transaction is confirmed.')}
                onSuccess={handleSuccess}
            />
        );
    }

    return null;
}