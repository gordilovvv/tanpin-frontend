import { Cart } from '@/uikit';
import { Currency } from '@/components/Currency';
import { BuyButton, DelistButton, UpdateSaleButton } from '@/components/Nft';
import { ActionBox, ActionTitle, USDPrice } from './Common';
import { useTranslation } from '@/localization';
import { formatTokenAmount } from '@/utils/formatTokenAmount';
import { Sale } from '@/states/types';
import styles from './DirectSale.module.scss';

type DirectSaleProps = {
    contractAddress: `0x${string}`
    tokenID: string,
    sale: Sale,
    isOwner?: boolean
}

export function DirectSale({ contractAddress, tokenID, sale, isOwner }: DirectSaleProps) {
    const { t } = useTranslation();

    return (
        <>
            <ActionBox>
                <div className={styles.top}>
                    <ActionTitle>
                        {formatTokenAmount(sale.price.amount)} {<Currency>{sale.price.currency}</Currency>}
                    </ActionTitle>

                    <USDPrice
                        amount={sale.price.amount}
                        currency={sale.price.currency}
                    />
                </div>

                {isOwner
                    ? <UpdateSaleButton
                        contractAddress={contractAddress}
                        tokenID={tokenID}
                        saleID={sale.saleID}
                        currentPrice={sale.price.amount}
                    />
                    : <BuyButton
                        contractAddress={contractAddress}
                        tokenID={tokenID}
                        saleID={sale.saleID}
                        price={sale.price.amount}
                        stock={sale.stock}
                        buttonIcon={<Cart />}
                        buttonView='primary'
                    />}
            </ActionBox>

            {isOwner && <DelistButton
                contractAddress={contractAddress}
                tokenID={tokenID}
                saleID={sale.saleID}
                text={t('Delist from Sale')}
            />}
        </>
    );
}