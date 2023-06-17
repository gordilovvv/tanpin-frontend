import { useEffect, useRef, useState } from 'react';
import { Spin } from '@/uikit';
import { sample } from 'lodash';
import styles from './LoadingContent.module.scss';

export function LoadingContent() {
    const interval = useRef<NodeJS.Timer | null>(null);
    const [phrase, setPhrase] = useState<string | undefined>();
    const phrases = [
        'Sending Crypto Waves',
        'Building the Blockchain Bridge',
        'Unleashing the Blockchain Power',
        'Navigating the Transaction Frontier',
        'Fueling the Blockchain Revolution',
        'Unlocking the NFT Adventure',
        'Buying, Selling, and Trading NFT',
        'Sending NFTs to the Moon',
        'Discovering the Joy of NFT Ownership',
        'Minting Memories with NFT'
    ];

    useEffect(() => {
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
    }, []);

    return (
        <div className={styles.loader}>
            <Spin size='s' />

            <div className={styles.loaderText}>
                {phrase}
            </div>
        </div>
    );
}