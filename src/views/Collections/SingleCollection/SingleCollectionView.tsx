import { CollectionHead } from './components/CollectionHead/CollectionHead';
import { NftCard, NftCardSkeleton } from '@/components/Nft';
import styles from './SingleCollectionView.module.scss';
import { Container } from '@/components/Layout';
import { NFTSaleStatus } from '@/states/types';
import { InputSearch, Select, Button, Filter as FilterIcon, Modal, ModalBody, ModalHead, ModalProps } from '@/uikit';
import { Filter } from '@/components/Filter';
import classNames from 'classnames';
import { useState } from 'react';


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

const options = [{
    value: 'string',
    label: 'string',
}];

export function SingleCollectionView() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className={styles.container}>
                <CollectionHead />

                <Container space>
                    <div

                        className={classNames(styles.wrapper, { [styles.hide]: isOpen })}
                    >
                        <div className={styles.top}>
                            <Button
                                iconSlot={<FilterIcon />}
                                view="secondary"
                                onClick={() => setIsOpen(prev => !prev)}
                            >Filters</Button>

                            <InputSearch
                                value={'3'}
                                placeholder="Search"
                                onChange={(val) => console.log(val)}
                            />

                            <Select
                                placeholderText="Status"
                                onChange={() => null}
                                options={options}
                            />
                        </div>


                        {/* <Modal isOpen={true}> */}
                        <Filter />

                        {/* </Modal> */}


                        <div>
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