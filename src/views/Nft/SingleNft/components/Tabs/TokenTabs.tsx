import { useCallback, useState } from 'react';
import { ToggleButton, ToggleGroup } from '@/uikit';
import { BlockWrap } from '../BlockWrap/BlockWrap';
import { TokenOwners } from '../Owners/TokenOwners';
import { TransactionsHistory } from '../History/Transactions/TransactionsHistory';
import { useTranslation } from '@/localization';
import { isUniqueNFT, isMultipleNFT } from '@/utils/nft';
import { NFT } from '@/states/types';
import styles from './TokenTabs.module.scss';

enum Tab {
    HISTORY = 'history',
    OWNERS = 'owners',
    BIDS = 'bids'
}

type TokenTabsProps = {
    nft: NFT
}

export function TokenTabs({ nft }: TokenTabsProps) {
    const { t } = useTranslation();
    const isUnique = isUniqueNFT(nft);
    const isMultiple = isMultipleNFT(nft);
    const [activeTab, setActiveTab] = useState<Tab>(Tab.OWNERS);
    const hasAuctions = nft.owners.some(owner => !!owner.auctions.length);

    // TODO: Добавить аукцион
    const renderContent = useCallback(() => {
        if (activeTab === Tab.BIDS) {
            return (<>Auction Bids</>);
        }

        if (activeTab === Tab.HISTORY) {
            return (<TransactionsHistory uniqueToken={isUnique} />);
        }

        if (activeTab === Tab.OWNERS) {
            return (<TokenOwners />);
        }
    }, [activeTab, nft.ID]);

    if (isUnique && !hasAuctions) {
        return (<BlockWrap title={t('History')}>
            <TransactionsHistory uniqueToken={isUnique} />
        </BlockWrap>);
    }

    return (
        <div className={styles.wrap}>
            <ToggleGroup>
                {hasAuctions && <ToggleButton
                    active={activeTab === Tab.BIDS}
                    onClick={() => setActiveTab(Tab.BIDS)}
                >
                    Bids
                </ToggleButton>}

                {isMultiple && <ToggleButton
                    view='outline'
                    active={activeTab === Tab.OWNERS}
                    onClick={() => setActiveTab(Tab.OWNERS)}
                >
                    {t('Owners')}
                </ToggleButton>}

                <ToggleButton
                    view='outline'
                    active={activeTab === Tab.HISTORY}
                    onClick={() => setActiveTab(Tab.HISTORY)}
                >
                    {t('History')}
                </ToggleButton>
            </ToggleGroup>

            <div className={styles.content}>
                {renderContent()}
            </div>
        </div>
    );
}