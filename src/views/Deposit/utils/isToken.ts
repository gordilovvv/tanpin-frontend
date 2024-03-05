import { InputCurrency, InputTokenCurrency, OutputCurrency } from '@/states/deposit/types';

export function isTokenCurrency(currency: InputCurrency | OutputCurrency): currency is InputTokenCurrency {
    return !!('limits' in currency && 'chain' in currency && currency.chain);
}