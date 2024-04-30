import { ActivityTransaction, ActivityType } from '@/states/activity/types';
import { Account } from './Account';
import { Editions } from './Editions';
import { Price } from './Price';
import { useTranslation } from '@/localization';

type DetailsProps = {
    transaction: ActivityTransaction
}

/* eslint-disable react/jsx-max-props-per-line */
export function DetailsSingleNFT({ transaction }: DetailsProps) {
    const { t } = useTranslation();

    if (transaction.type === ActivityType.MINT) {
        return (<div>
            <span style={{ color: 'var(--color-typo-base)', fontWeight: '600' }}>{transaction.data.gameName}</span> {t('minted')}
        </div>);
    }

    if (transaction.type === ActivityType.TRANSFER) {
        return (<div>
            <Account address={transaction.data.from} /> {t('transfered')} {t('to')} <Account address={transaction.data.to} />
        </div>);
    }

    if (transaction.type === ActivityType.BUY_DIRECT_SALE) {
        return (
            <div>
                <Account address={transaction.fromAddress} /> {t('bought')} {t('for')} <Price
                    amount={transaction.data.amount}
                    price={transaction.data.price}
                    currency={transaction.data.currency}
                />
            </div>
        );
    }

    if (transaction.type === ActivityType.CREATE_DIRECT_SALE) {
        return (
            <div>
                <Account address={transaction.fromAddress} /> {t('listed')} {t('for')} <Price
                    amount={transaction.data.amount}
                    price={transaction.data.price}
                    currency={transaction.data.currency}
                />
            </div>
        );
    }

    if (transaction.type === ActivityType.UPDATE_DIRECT_SALE) {
        return (
            <div>
                <Account address={transaction.fromAddress} /> {t('changed price')} {t('to')} <Price
                    amount={1}
                    price={transaction.data.price}
                    currency={transaction.data.currency}
                />
            </div>
        );
    }

    if (transaction.type == ActivityType.CLOSE_DIRECT_SALE) {
        return (<div>
            <Account address={transaction.fromAddress} /> {t('unlisted')}
        </div>);
    }

    return (<UnknownTransaction transaction={transaction} />);
}

export function DetailsMultiplyNFT({ transaction }: DetailsProps) {
    const { t } = useTranslation();

    if (transaction.type === ActivityType.MINT) {
        return (<div>
            <span style={{ color: 'var(--color-typo-base)', fontWeight: '600' }}>{transaction.data.gameName}</span> {t('minted')} <Editions num={transaction.data.amount} />
        </div>);
    }

    if (transaction.type === ActivityType.TRANSFER) {
        return (<div>
            <Account address={transaction.data.from} /> {t('transfered')} <Editions num={transaction.data.amount} /> {t('to')} <Account address={transaction.data.to} />
        </div>);
    }

    if (transaction.type === ActivityType.BUY_DIRECT_SALE) {
        return (
            <div>
                <Account address={transaction.fromAddress} /> {t('bought')} <Editions num={transaction.data.amount} /> {t('for')} <Price
                    amount={transaction.data.amount}
                    price={transaction.data.price}
                    currency={transaction.data.currency}
                />
            </div>
        );
    }

    if (transaction.type === ActivityType.CREATE_DIRECT_SALE) {
        return (
            <div>
                <Account address={transaction.fromAddress} /> {t('listed')} <Editions num={transaction.data.amount} /> {t('for')} <Price
                    amount={transaction.data.amount}
                    price={transaction.data.price}
                    currency={transaction.data.currency}
                />
            </div>
        );
    }

    if (transaction.type === ActivityType.UPDATE_DIRECT_SALE) {
        return (
            <div>
                <Account address={transaction.fromAddress} /> {t('changed price')} <Editions num={transaction.data.amount} /> {t('to')} <Price
                    amount={1}
                    price={transaction.data.price}
                    currency={transaction.data.currency}
                />
            </div>
        );
    }

    if (transaction.type == ActivityType.CLOSE_DIRECT_SALE) {
        return (<div>
            <Account address={transaction.fromAddress} /> {t('unlisted')} <Editions num={transaction.data.amount} />
        </div>);
    }

    return (<UnknownTransaction transaction={transaction} />);
}

function UnknownTransaction({ transaction }: DetailsProps) {
    const { t } = useTranslation();

    return (<div>
        <span>{t('Unknown transaction')} {transaction.type}</span>
    </div>);
}