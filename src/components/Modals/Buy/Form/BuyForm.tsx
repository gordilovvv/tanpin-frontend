import { useCallback, useEffect, useMemo } from 'react';
import { Button, Input, Select, UnstyleButton, useToast } from '@/uikit';
import { NFTPreview } from '@/components/Nft';
import { InsufficientFunds } from '@/components/Funds';
import { BuyReceipt } from './BuyReceipt';
import { BlackRussiaLogo } from './BlackRussiaLogo';
import { LoadingContent } from '../../Loading/LoadingContent';
import { useTranslation } from '@/localization';
import { useNFT } from '@/states/nft/hooks/useNFT';
import { useAccount } from '@/states/user/hooks/useAccount';
import { useBlackRussiaCharacterSelect, useBlackRussiaCharacters, useBuyActions, useBuyDirectSaleInfo, useBuyState } from '@/states/buy/hooks';
import { isUniqueNFT } from '@/utils/nft';
import styles from './BuyForm.module.scss';

type BuyFormProps = {
    saleID: string,
    price: string,
    currency: string,
    availableAmount: number,
    onPurchase: () => void,
    onClose?: () => void
}

export function BuyForm({ saleID, price, currency, availableAmount, onPurchase, onClose }: BuyFormProps) {
    const { t } = useTranslation();
    const { toastDanger } = useToast();
    const nft = useNFT()!;
    const isUnique = isUniqueNFT(nft);
    const { address } = useAccount();
    const { typedAmount } = useBuyState();
    const { handleAmountType, handleTotalPrice } = useBuyActions();

    // Персонажи игрока в Black Russia
    const { characters, isLoading: isLoadingCharacters, isBlackRussiaNFT } = useBlackRussiaCharacters(
        nft.tokenID,
        address!
    );

    // Выбор персонажа Black Russia
    const { selectedCharacterID, onSelectCharacter, isLoading: isLoadingCharacterSelect } = useBlackRussiaCharacterSelect(
        nft.contractAddress,
        nft.tokenID,
        saleID
    );

    const selectOptions = useMemo(() => {
        return characters?.map(({ id, name, server }) => ({
            label: `${name} (#${server.id} ${server.name})`,
            value: id
        }));
    }, [characters]);

    // Количество nft и выбор персонажа
    const hasFields = selectOptions || !isUnique;
    const maxInputLength = `${availableAmount}`.length;

    const { parsedAmount, totalPrice, isLoading, amountError, balanceError, insufficientBalance, characterError } = useBuyDirectSaleInfo(
        price,
        currency,
        typedAmount,
        availableAmount,
        selectedCharacterID,
        isBlackRussiaNFT
    );

    useEffect(() => {
        handleTotalPrice(totalPrice);
    }, [totalPrice]);

    const handleSelectCharacter = useCallback((characterID: number) => {
        const character = characters?.find(character => character.id === characterID);

        if (!character) {
            return toastDanger(t('An error occurred'));
        }

        onSelectCharacter(characterID, character.server.id);
    }, [characters, onSelectCharacter, t, toastDanger]);

    const handleMax = useCallback(() => {
        handleAmountType(`${availableAmount}`);
    }, [handleAmountType, availableAmount]);

    if (isLoading || isLoadingCharacters) {
        return (<LoadingContent />);
    }

    return (
        <div className={styles.form}>
            <NFTPreview
                nft={nft}
                onClick={onClose}
            />

            {hasFields && <div className={styles.fields}>
                {selectOptions && <Select
                    options={selectOptions}
                    selectedValue={selectedCharacterID}
                    placeholder={t('Select your character')}
                    addon={<BlackRussiaLogo className={styles.blackRussiaLogo} />}
                    onChange={handleSelectCharacter}
                />}

                {!isUnique && <Input
                    numerical
                    value={typedAmount}
                    onInput={handleAmountType}
                    placeholder='0'
                    max={availableAmount}
                    maxLength={maxInputLength}
                    danger={parsedAmount !== undefined && !!amountError}
                    rightAddon={<UnstyleButton
                        className={styles.maxButton}
                        onClick={handleMax}
                    >
                        {t('out of %number%', { number: availableAmount })}
                    </UnstyleButton>}
                    style={{ paddingRight: '156px' }}
                />}
            </div>}

            <BuyReceipt
                amount={parsedAmount}
                price={price}
                currency={currency}
                detailed={!isUnique}
            />

            {balanceError && <InsufficientFunds
                amount={insufficientBalance}
                currency={currency}
            />}
            {!balanceError && <Button
                loading={isLoadingCharacterSelect}
                disabled={!!amountError || !!characterError}
                onClick={onPurchase}
            >
                {characterError || amountError || t('Proceed to payment')}
            </Button>}
        </div>
    );
}