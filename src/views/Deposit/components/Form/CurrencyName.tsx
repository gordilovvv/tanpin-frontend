import { HTMLAttributes } from 'react';
import { InputCurrency, OutputCurrency } from '@/states/deposit/types';
import { isTokenCurrency } from '../../utils/isToken';
import classNames from 'classnames';
import styles from './CurrencyName.module.scss';

type CurrencyChainProps = {
    currency: InputCurrency | OutputCurrency
} & HTMLAttributes<HTMLDivElement>;

export function CurrencyName({ currency, className, ...props }: CurrencyChainProps) {
    const isToken = isTokenCurrency(currency);

    const getTokenChain = (chain: string) => {
        if (chain === 'polygon') {
            return 'Polygon';
        }

        if (chain === 'ethereum') {
            return 'ERC20';
        }

        if (chain === 'bsc') {
            return 'BEP20';
        }

        if (chain === 'tron') {
            return 'TRC20';
        }

        return 'chain';
    };

    return (
        <div
            className={classNames(styles.name, className)}
            {...props}
        >
            {currency.symbol} {isToken && getTokenChain(currency.chain)}
        </div>
    );
}