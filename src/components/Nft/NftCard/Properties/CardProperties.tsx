import { ReactNode, memo } from 'react';
import styles from './CardProperties.module.scss';
import { Auction, NFTSaleStatus } from '@/states/types';
import { AuctionTime } from '../AuctionTime/AuctionTime';
import { formatTokenAmount } from '@/utils/formatTokenAmount';

type PropertyProps = {
    label: string,
    value: string | ReactNode
}

const Property = ({ label, value }: PropertyProps) => {
    return (
        <div className={styles.property}>
            <div className={styles.propertyLabel}>
                {label}
            </div>

            <div className={styles.propertyValue}>
                {value}
            </div>
        </div>
    );
};

type CardPropertiesProps = {
    price?: {
        amount: string,
        currency: string
    }
    auction?: Auction
    status: NFTSaleStatus
}

export const CardProperties = memo(({ price, auction, status }: CardPropertiesProps) => {
    const renderProperties = () => {
        if (status === NFTSaleStatus.FIXED_PRICE && price) {
            return (
                <>
                    <Property
                        label='Price'
                        value={<>{formatTokenAmount(price.amount)} <span>{price.currency}</span></>}
                    />
                </>
            );
        }

        if (status === NFTSaleStatus.AUCTION && auction) {
            return (
                <>
                    <Property
                        label='Highest bid'
                        value={<>{formatTokenAmount(auction.highestBid.amount)} <span>{auction.highestBid.currency}</span></>}
                    />

                    <Property
                        label='Time left'
                        value={<AuctionTime endDate={auction.endDate} />}
                    />
                </>
            );
        }

        return (
            <Property
                label='Price'
                value='Not for sale'
            />
        );
    };
    return (
        <div className={styles.properties}>
            {renderProperties()}
        </div>
    );
});

CardProperties.displayName = 'CardProperties';