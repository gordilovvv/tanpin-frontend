import { HTMLAttributes } from 'react';
import { CurrencyChain } from '../CurrencyChain';
import { InputCurrency, OutputCurrency } from '@/states/deposit/types';
import { isTokenCurrency } from '../../utils/isToken';
import classNames from 'classnames';
import styles from './CurrencyName.module.scss';

type CurrencyChainProps = {
    currency: InputCurrency | OutputCurrency
} & HTMLAttributes<HTMLDivElement>;

export function CurrencyName({ currency, className, ...props }: CurrencyChainProps) {
    const isToken = isTokenCurrency(currency);

    return (
        <div
            className={classNames(styles.name, className)}
            {...props}
        >
            {currency.symbol} {isToken && <CurrencyChain chain={currency.chain} />}
        </div>
    );
}