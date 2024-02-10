import { NFTSaleStatus } from '@/states/types';
import { AuctionTime } from '../AuctionTime/AuctionTime';
import { Property } from './Property/Property';
import { PropertiesList } from './List/PropertiesList';
import { useTranslation } from '@/localization';
import { formatTokenAmount } from '@/utils/formatTokenAmount';

type CardPropertiesProps = {
    type: 'singleNFT' | 'multipleNFT'
    price?: string
    currency?: string
    auctionEndDate?: string
    status: NFTSaleStatus
}

export function CardProperties({ type, price, currency, auctionEndDate, status }: CardPropertiesProps) {
    const { t } = useTranslation();

    if (price && status === NFTSaleStatus.FIXED_PRICE) {
        return (
            <PropertiesList>
                <Property
                    label={type === 'singleNFT' ? t('Price') : t('Price from')}
                    value={<>{formatTokenAmount(price)} <span>{currency}</span></>}
                />
            </PropertiesList>
        );
    }

    if (price && auctionEndDate && status === NFTSaleStatus.AUCTION) {
        return (
            <PropertiesList>
                <Property
                    label={t('Highest bid')}
                    value={<>{formatTokenAmount(price)} <span>{currency}</span></>}
                />

                <Property
                    label={t('Time left')}
                    value={<AuctionTime endDate={auctionEndDate} />}
                />
            </PropertiesList>
        );
    }

    return (
        <PropertiesList>
            <Property
                label={t('Price')}
                value={t('Not for sale')}
            />
        </PropertiesList>
    );
}