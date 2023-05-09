import styles from './NftCard.module.scss';
import { Button } from '@/uikit';


export function NftCard() {
    return (
        <div className={styles.card}>
            <div className={styles.cardImgWrap}>
                <img
                    className={styles.cardImg}
                    src="https://s3-alpha-sig.figma.com/img/2f18/5f5e/18100085c77444b3e00e10428a0599cd?Expires=1684713600&Signature=hYwf6-BNv-lEf0wSulBi1n8F0-cQvZrzBCMu~~Q8SP3u-E8c9rgYpDFPgRg7yXCje5ndOs31Mh8FSqTuMU3DARndDpEYCTYP930qIo--wffxg95QIFJik7Q7~9cLI-~Z8rTJ9eR1GeB1PojbhoW1hzwfwGCZOCVQw2dfGqkPpoT9XA0G1QQ-6zO96vwdBDIwsBl~gA0sNr0m5fZDRUsex8NScXdpgUNjAdWYZ96OTB4DOSjXQ8LZqgoqNiJeazctS3-U5cTCIjiTI0-2aEPjGAQsaL6oysJ~rIJ9xvH7kGvYcs5rWfD34pDCKDGF0uy2TsbovJz~5AVzucGicIkMyw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
                />
            </div>

            <div className={styles.info}>
                <div className={styles.infoHeader}>
                    <div className={styles.infoHeaderTitle}>Cars Drop 2022</div>
                    <div className={styles.infoHeaderBody}>BMW X5M</div>
                </div>

                <div className={styles.infoBody}>
                    <div className={styles.infoBodyItem}>
                        <div className={styles.infoBodyTitle}>
                            Highest bid
                        </div>

                        <div className={styles.infoBodyText}>
                            10 <span className={styles.ghost}>USDT</span>
                        </div>
                    </div>

                    <div className={styles.infoBodyItem}>
                        <div className={styles.infoBodyTitle}>
                            Highest bid
                        </div>

                        <div className={styles.infoBodyText}>
                            10 <span className={styles.ghost}>USDT</span>
                        </div>
                    </div>

                    <Button
                        className={styles.btn}
                        view="secondary"
                    >Buy now</Button>
                </div>
            </div>
        </div>
    );
}