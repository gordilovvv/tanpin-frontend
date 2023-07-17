import { useMemo } from 'react';
import { UnstyleLink } from '@/uikit';
import { UserAvatar } from '@/components/User';
import { BuyButton, DelistButton, UpdateSaleButton } from '@/components/Nft';
import { Offer } from './Offer';
import { Auction, NFTOwner, NFTSaleStatus, Sale } from '@/states/types';
import { getAddressExplorerURL } from '@/utils/explorer';
import { ellipseAddress } from '@/utils/addressHelper';
import classNames from 'classnames';
import styles from './OwnerRow.module.scss';

type OwnerRowProps = {
    nftID: string,
    owner: Omit<NFTOwner, 'sales' | 'auctions'> & {
        sale?: Sale
        auction?: Auction
    },
    isUserOwner: boolean
}

// TODO:
// 1. ДОБАВИТЬ АУКЦИОН
// 2. АДАПТИВ
export function OwnerRow({ nftID, owner, isUserOwner }: OwnerRowProps) {
    const saleDescription = useMemo(() => {
        if (owner.status === NFTSaleStatus.NOT_FOR_SALE) {
            return (<Offer total={owner.value} />);
        }

        if (owner.sale && owner.status === NFTSaleStatus.FIXED_PRICE) {
            return (<Offer
                value={owner.sale.stock}
                price={owner.sale.price.amount}
                currency={owner.sale.price.currency}
                total={owner.value}
            />);
        }

        return null;
    }, [owner]);

    const tokenAction = useMemo(() => {
        if (owner.sale && owner.status === NFTSaleStatus.FIXED_PRICE) {
            if (isUserOwner) {
                return (<>
                    <UpdateSaleButton
                        nftID={nftID}
                        saleID={owner.sale.saleID}
                    />

                    <DelistButton
                        nftID={nftID}
                        saleID={owner.sale.saleID}
                        text='Delist'
                    />
                </>);
            } else {
                return (<BuyButton
                    nftID={nftID}
                    saleID={owner.sale.saleID}
                    price={owner.sale.price.amount}
                    stock={owner.sale.stock}
                    buttonView='secondary'
                />);
            }
        }

        return null;
    }, [nftID, owner.status, isUserOwner]);

    return (
        <div
            className={classNames(styles.row, {
                [styles.isUser]: isUserOwner
            })}
        >
            <div className={styles.content}>
                <UserAvatar
                    address={owner.owner}
                    size='l'
                />

                <div className={styles.info}>
                    <div className={styles.title}>
                        <UnstyleLink
                            href={getAddressExplorerURL(owner.owner)}
                            rel='noreferrer noopener'
                            target='_blank'
                        >
                            {isUserOwner ? 'You' : ellipseAddress(owner.owner)}
                        </UnstyleLink>
                    </div>

                    <div className={styles.description}>
                        {saleDescription}
                    </div>
                </div>
            </div>

            {tokenAction && <div className={styles.action}>
                {tokenAction}
            </div>}
        </div>
    );
}