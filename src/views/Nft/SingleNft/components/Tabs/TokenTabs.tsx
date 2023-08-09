import { useCallback, useState } from 'react';
import { ToggleButton, ToggleGroup } from '@/uikit';
import { BlockWrap } from '../BlockWrap/BlockWrap';
import { TokenOwners } from '../Owners/TokenOwners';
import { TransactionsHistory } from '../History/Transactions/TransactionsHistory';
import { isMultipleNFT, isSingleNFT } from '@/utils/nft';
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

// TODO: Добавить аукцион
export function TokenTabs({ nft }: TokenTabsProps) {
    const isSingle = isSingleNFT(nft);
    const isMultiple = isMultipleNFT(nft);
    const [activeTab, setActiveTab] = useState<Tab>(Tab.OWNERS);

    const renderContent = useCallback(() => {
        if (activeTab === Tab.HISTORY) {
            return (<TransactionsHistory />);
        }

        if (activeTab === Tab.OWNERS) {
            return (<TokenOwners />);
        }
    }, [activeTab, nft.ID]);

    if (isSingle && !nft.auction) {
        return (<BlockWrap title='History'>
            <TransactionsHistory />
        </BlockWrap>);
    }

    return (
        <div className={styles.wrap}>
            <ToggleGroup>
                {/* <ToggleButton
                    active={activeTab === Tab.BIDS}
                    onClick={() => setActiveTab(Tab.BIDS)}
                >
                    Bids
                </ToggleButton> */}

                {isMultiple && <ToggleButton
                    view='outline'
                    active={activeTab === Tab.OWNERS}
                    onClick={() => setActiveTab(Tab.OWNERS)}
                >
                    Owners
                </ToggleButton>}

                <ToggleButton
                    view='outline'
                    active={activeTab === Tab.HISTORY}
                    onClick={() => setActiveTab(Tab.HISTORY)}
                >
                    History
                </ToggleButton>
            </ToggleGroup>

            <div className={styles.content}>
                {renderContent()}
            </div>
        </div>
    );
}