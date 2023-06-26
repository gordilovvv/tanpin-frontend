import { NFTSaleStatus } from '@/states/types';
import { AuctionTime } from '../AuctionTime/AuctionTime';
import { Property } from './Property/Property';
import { PropertiesList } from './List/PropertiesList';
import { formatTokenAmount } from '@/utils/formatTokenAmount';

type CardPropertiesProps = {
    type: 'singleNFT' | 'multipleNFT'
    price?: string
    currency?: string
    auctionEndDate?: string
    status: NFTSaleStatus
}

export function CardProperties({ type, price, currency, auctionEndDate, status }: CardPropertiesProps) {
    if (price && currency && status === NFTSaleStatus.FIXED_PRICE) {
        return (
            <PropertiesList>
                <Property
                    label={type === 'singleNFT' ? 'Price' : 'Price from'}
                    value={<>{formatTokenAmount(price)} <span>{currency}</span></>}
                />
            </PropertiesList>
        );
    }

    if (price && currency && auctionEndDate && status === NFTSaleStatus.AUCTION) {
        return (
            <PropertiesList>
                <Property
                    label='Highest bid'
                    value={<>{formatTokenAmount(price)} <span>{currency}</span></>}
                />

                <Property
                    label='Time left'
                    value={<AuctionTime endDate={auctionEndDate} />}
                />
            </PropertiesList>
        );
    }

    return (
        <PropertiesList>
            <Property
                label='Price'
                value='Not for sale'
            />
        </PropertiesList>
    );
}