import { useEffect, useRef, useState } from 'react';
import { Spin } from '@/uikit';
import { sample } from 'lodash';
import { useTranslation } from '@/localization';
import styles from './LoadingContent.module.scss';

type LoadingContentProps = {
    text?: string
}

export function LoadingContent({ text }: LoadingContentProps) {
    const { t } = useTranslation();
    const interval = useRef<NodeJS.Timer | null>(null);
    const [phrase, setPhrase] = useState<string | undefined>(text);

    const phrases = [
        t('Sending Crypto Waves'),
        t('Building the Blockchain Bridge'),
        t('Unleashing the Blockchain Power'),
        t('Navigating the Transaction Frontier'),
        t('Fueling the Blockchain Revolution'),
        t('Unlocking the NFT Adventure'),
        t('Buying, Selling, and Trading NFT'),
        t('Sending NFTs to the Moon'),
        t('Discovering the Joy of NFT Ownership'),
        t('Minting Memories with NFT')
    ];

    // Randomize phrases
    useEffect(() => {
        if (!text) {
            setPhrase(sample(phrases));

            interval.current = setInterval(() => {
                setPhrase(sample(phrases));
            }, 1_500);

            return () => {
                if (interval.current) {
                    clearInterval(interval.current);
                    interval.current = null;
                }
            };
        } else {
            setPhrase(text);
        }
    }, [text]);

    return (
        <div className={styles.loader}>
            <Spin size='s' />

            <div className={styles.loaderText}>
                {phrase}
            </div>
        </div>
    );
}