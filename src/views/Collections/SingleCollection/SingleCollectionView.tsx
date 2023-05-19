import { CollectionHead } from './components/CollectionHead/CollectionHead';
import { NftCard, NftCardSkeleton } from '@/components/Nft';
import styles from './SingleCollectionView.module.scss';
import { Container } from '@/components/Layout';
import { NFTSaleStatus } from '@/states/types';
import { InputSearch, Select, Button, Filter as FilterIcon, Modal } from '@/uikit';
import { Filter } from '@/components/Filter';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useOpenedState } from '@/hooks/useOpenedState';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useFilterStore } from '@/states/collection/filterStore';
import { useFilterStoreActons } from '@/states/collection/hooks/useFilterStoreActions';
const mock = {
    ID: '1',
    name: 'Porsche Cayenne',
    description: '',
    attributes: [],
    imageURL: 'https://s3-alpha-sig.figma.com/img/2f18/5f5e/18100085c77444b3e00e10428a0599cd?Expires=1684713600&Signature=hYwf6-BNv-lEf0wSulBi1n8F0-cQvZrzBCMu~~Q8SP3u-E8c9rgYpDFPgRg7yXCje5ndOs31Mh8FSqTuMU3DARndDpEYCTYP930qIo--wffxg95QIFJik7Q7~9cLI-~Z8rTJ9eR1GeB1PojbhoW1hzwfwGCZOCVQw2dfGqkPpoT9XA0G1QQ-6zO96vwdBDIwsBl~gA0sNr0m5fZDRUsex8NScXdpgUNjAdWYZ96OTB4DOSjXQ8LZqgoqNiJeazctS3-U5cTCIjiTI0-2aEPjGAQsaL6oysJ~rIJ9xvH7kGvYcs5rWfD34pDCKDGF0uy2TsbovJz~5AVzucGicIkMyw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
    contractAddress: '0x',
    tokenID: '1',
    owner: '0x',
    price: {
        amount: '100',
        currency: 'USDT'
    },
    status: NFTSaleStatus.FIXED_PRICE,
};



const options: { value: string; label: string }[] = [
    { value: 'RECENTLY_ADDED', label: 'Recently Added' },
    { value: 'HIGH_PRICE_FIRST', label: 'High Price First' },
    { value: 'LOW_PRICE_FIRST', label: 'Low Price First' },
];

export function SingleCollectionView() {
    const sort = useFilterStore((state) => state.sort);

    const { setSearch, setSort } = useFilterStoreActons();

    const isMobile = useIsMobile();

    const [isFilterDesctopVisible, setisFilterDesctopVisible] = useState(false);

    const mobileFilterState = useOpenedState();

    useEffect(() => {
        // TODO:
        // 1. Скрыть десктоп фильтр при resize
        // 2. Скрыть модалку фильтра при resize
    }, []);

    const handleFilterToggle = () => {
        setisFilterDesctopVisible(prev => !prev);
        mobileFilterState.toggle();
    };
    const handleMobileClose = () => {
        mobileFilterState.close();
        setisFilterDesctopVisible(prev => !prev);
    };

    return (
        <>
            <div className={styles.container}>
                <CollectionHead />

                <Container space>
                    <div
                        className={classNames(styles.wrapper, {
                            [styles.oneColumn]: !isFilterDesctopVisible || isMobile,
                            [styles.twoColumns]: isFilterDesctopVisible && !isMobile
                        })}
                    >
                        <div className={styles.top}>
                            <Button
                                iconSlot={<FilterIcon />}
                                view="secondary"
                                onClick={handleFilterToggle}
                            >
                                Filters
                            </Button>

                            <InputSearch
                                placeholder="Search"
                                onChange={setSearch}
                            />

                            <Select
                                placeholderText="Sort"
                                onChange={setSort}
                                selectedValue={sort}
                                options={options}
                            />
                        </div>

                        {!isMobile && isFilterDesctopVisible && <Filter className={styles.filter} />}

                        {isMobile && <Modal
                            isOpen={isMobile && mobileFilterState.isOpen}
                            onClose={handleMobileClose}
                        >
                            <Filter />
                        </Modal>}


                        <div className={styles.table}>
                            <div className={styles.cardWrapper}>

                                {true && (new Array(25)).fill(1).map((el, idx) => (<NftCardSkeleton key={idx} />))}

                                {(new Array(25)).fill(1).map((el, idx) => (
                                    <NftCard
                                        key={idx}
                                        nft={mock}
                                        collectionID={'20'}
                                        collectionName={'Cars Drop 2022'}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </Container >
            </div >
        </>
    );
}