import { Mark, UnstyleButton } from '@/uikit';
import { CurrencyIcon } from '@/components/Currency';
import { CurrencyName } from './CurrencyName';
import { InputCurrency, OutputCurrency } from '@/states/deposit/types';
import classNames from 'classnames';
import styles from './CurrencySelectItem.module.scss';

type CurrencySelectItemProps = {
    currency: InputCurrency | OutputCurrency,
    active?: boolean,
    onClick?: () => void
}

export function CurrencySelectItem({ currency, active, onClick }: CurrencySelectItemProps) {
    return (
        <UnstyleButton
            className={classNames(styles.button, {
                [styles.active]: active
            })}
            onClick={onClick}
        >
            <div className={styles.wrap}>
                {active && <div className={styles.mark}>
                    <Mark />
                </div>}

                <CurrencyIcon code={currency.id} />

                <CurrencyName currency={currency} />
            </div>
        </UnstyleButton>
    );
}