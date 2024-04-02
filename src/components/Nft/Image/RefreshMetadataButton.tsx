import { Button, Reload } from '@/uikit';
import { RefreshStatus, useMetadataRefresh } from '@/states/nft/hooks/useMetadataRefresh';
import { useTranslation } from '@/localization';
import classNames from 'classnames';
import styles from './RefreshMetadataButton.module.scss';

type RefreshMetadataButtonProps = {
    contractAddress: `0x${string}`,
    tokenID: string,
}

export function RefreshMetadataButton({ contractAddress, tokenID }: RefreshMetadataButtonProps) {
    const { t } = useTranslation();
    const { status, refreshTokenMetadata } = useMetadataRefresh(contractAddress, tokenID);

    const loading = status === RefreshStatus.PENDING;
    const text = loading ? t('Reloading...') : t('Reload metadata');

    return (<>
        <Button
            view='secondary'
            className={classNames({
                [styles.loading]: loading
            })}
            iconSlot={<span className={styles.icon}>
                <Reload />
            </span>}
            onClick={refreshTokenMetadata}
        >
            <div className={styles.text}>
                {text}
            </div>
        </Button>
    </>);
}