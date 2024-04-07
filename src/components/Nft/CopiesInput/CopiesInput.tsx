import { useCallback } from 'react';
import { Input, UnstyleButton } from '@/uikit';
import { useTranslation } from '@/localization';
import styles from './CopiesInput.module.scss';

type CopiesInputProps = {
    value: string,
    maxValue: number,
    danger?: boolean,
    onInput: (value: string) => void
}

export function CopiesInput({ value, maxValue, danger, onInput }: CopiesInputProps) {
    const { t } = useTranslation();

    const maxInputLength = `${maxValue}`.length;
    const handleMax = useCallback(() => {
        onInput(`${maxValue}`);
    }, [maxValue, onInput]);

    return (
        <Input
            numerical
            value={value}
            onInput={onInput}
            placeholder='0'
            max={maxValue}
            maxLength={maxInputLength}
            danger={danger}
            rightAddon={<UnstyleButton
                className={styles.maxButton}
                onClick={handleMax}
            >
                {t('out of %number%', { number: maxValue })}
            </UnstyleButton>}
            style={{ paddingRight: '156px' }}
        />
    );
}