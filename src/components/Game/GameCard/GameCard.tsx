import styles from './GameCard.module.scss'
import Overlay from '@/app/assets/bg/overlay.png'
import { Button } from '@/uikit'
import { CollectionItem } from '@/components/Collections/CollectionItem'

export const GameCard =()=>{
    return (
        <div className={styles.wrapper}>
        <div className={styles.card}>
            <img className={styles.cardImg} src="https://storage.yandexcloud.net/stage01-metronews-transfer/media/20220618/13/20/858x540_60e21547_dvindb8d.jpg" alt="" />
            <div className={styles.content}>
                <div className={styles.info}>
                   <div className={styles.infoHeader}>
                        <img src="https://storage.yandexcloud.net/stage01-metronews-transfer/media/20220618/13/20/858x540_60e21547_dvindb8d.jpg" className={styles.headerImg} />
                        <span className={styles.headerTitle}>
                            NFTGTA
                        </span>
                   </div>
                   <div className={styles.inner}>
                        <div className={styles.innerItem}>
                            <div className={styles.itemTitle}>Volume (1 day)</div>
                            <div className={styles.itemBody}>8 421 USDT</div>
                        </div>
                        <div className={styles.innerItem}>
                            <div className={styles.itemTitle}>Volume (1 day)</div>
                            <div className={styles.itemBody}>8 421 USDT</div>
                        </div>
                   </div>
                </div>
                <Button className={styles.btn} view="secondary">
                    Open collections
                </Button>
                
            </div>
        
        </div>
            <div className={styles.itemsWrapper}>
                <CollectionItem/>
                <CollectionItem/>
                <CollectionItem/>
                <CollectionItem/>
            </div>
        </div>
    )
}