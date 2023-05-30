import { Button, Cart } from '@/uikit';
import { ActionBox } from '../Box/ActionBox';
import { USDPrice } from '../USDPrice/USDPrice';
import { ActionTitle } from '../Title/ActionTitle';
import { formatTokenAmount } from '@/utils/formatTokenAmount';
import { NFTInStore } from '@/states/nft/types';
import styles from './DirectSale.module.scss';

type DirectSaleProps = {
    nft: NFTInStore
}

export function DirectSale({ nft }: DirectSaleProps) {
    const handleBuyNow = () => {
        console.log('buy now');
    };

    return (
        <ActionBox>
            <div className={styles.top}>
                <ActionTitle>
                    {formatTokenAmount(nft.price!.amount)} {nft.price!.currency}
                </ActionTitle>

                <USDPrice
                    tokenAmount={nft.price!.amount}
                    tokenSymbol={nft.price!.currency}
                />
            </div>

            <Button
                iconSlot={<Cart />}
                onClick={handleBuyNow}
            >
                Buy now
            </Button>
        </ActionBox>
    );
}