import { Cart } from '@/uikit';
import { ActionBox } from '../Box/ActionBox';
import { ActionTitle } from '../Title/ActionTitle';
import { USDPrice } from '../USDPrice/USDPrice';
import { BuyButton, DelistButton, UpdateSaleButton } from '@/components/Nft';
import { formatTokenAmount } from '@/utils/formatTokenAmount';
import { Sale } from '@/states/types';
import styles from './DirectSale.module.scss';

type DirectSaleProps = {
    nftID: string,
    sale: Sale,
    isOwner?: boolean
}

export function DirectSale({ nftID, sale, isOwner }: DirectSaleProps) {
    return (
        <>
            <ActionBox>
                <div className={styles.top}>
                    <ActionTitle>
                        {formatTokenAmount(sale.price.amount)} {sale.price.currency}
                    </ActionTitle>

                    <USDPrice
                        tokenAmount={sale.price.amount}
                        tokenSymbol={sale.price.currency}
                    />
                </div>

                {isOwner
                    ? <UpdateSaleButton
                        nftID={nftID}
                        saleID={sale.saleID}
                        currentPrice={sale.price.amount}
                    />
                    : <BuyButton
                        nftID={nftID}
                        saleID={sale.saleID}
                        price={sale.price.amount}
                        stock={sale.stock}
                        buttonIcon={<Cart />}
                        buttonView='primary'
                    />}
            </ActionBox>

            {isOwner && <DelistButton
                nftID={nftID}
                saleID={sale.saleID}
                text='Delist from Sale'
            />}
        </>
    );
}