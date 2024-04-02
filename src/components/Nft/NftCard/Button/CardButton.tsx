import { Button } from '@/uikit';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@/localization';
import { NFTSaleStatus } from '@/states/types';
import { Address } from 'viem';
import classNames from 'classnames';
import styles from './CardButton.module.scss';

type CardButtonProps = {
    contractAddress: Address,
    tokenID: string,
    status: NFTSaleStatus.FIXED_PRICE | NFTSaleStatus.AUCTION
    className?: string
}

// TODO: КОГДА ПОЙДЕТ ЛОГИКА ПОКУПКИ ИЛИ СТАВКИ РАЗДЕЛИТЬ НА 2 КОМПОНЕНТА
export const CardButton = ({ contractAddress, tokenID, status, className }: CardButtonProps) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/${contractAddress}:${tokenID}`);
    };

    return (
        <div className={classNames(styles.wrap, className)}>
            <Button
                view='secondary'
                onClick={(event: any) => {
                    event.preventDefault();
                    event.stopPropagation();

                    handleClick();
                }}
            >
                {status === NFTSaleStatus.FIXED_PRICE ? t('Purchase') : t('Bid')}
            </Button>
        </div>
    );
};
