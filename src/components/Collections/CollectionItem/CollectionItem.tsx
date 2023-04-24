import styles from './CollectionItem.module.scss'
export const CollectionItem =()=>{
    return (
        <div className={styles.item}>
            <img src="https://storage.yandexcloud.net/stage01-metronews-transfer/media/20220618/13/20/858x540_60e21547_dvindb8d.jpg" className={styles.img}  />
            <div className={styles.itemBody}>
                <div className={styles.itemHeader}>2023 Cars</div>
                <div className={styles.items}>
                    <div className={styles.itemsBody}>
                        <div className={styles.itemsHeader}>Floor price</div>
                        <div className={styles.itemsPrice}>
                            <span className={ styles.priceWhite}>1.40</span>
                            <span className={styles.price}>USDT</span>
                        </div>
                    </div>
                    <div className={styles.itemsBody}>
                        <div className={styles.itemsHeader}>Floor price</div>
                        <div className={styles.itemsPrice}>
                            <span className={ styles.priceWhite}>1.40</span>
                            <span className={styles.price}>USDT</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}