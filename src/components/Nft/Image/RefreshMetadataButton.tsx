import { Button, Reload } from '@/uikit';
import { RefreshStatus, useMetadataRefresh } from '@/states/nft/hooks/useMetadataRefresh';
import { ErrorMessageModal } from '@/components/Modals';
import classNames from 'classnames';
import styles from './RefreshMetadataButton.module.scss';

type RefreshMetadataButtonProps = {
    nftID: string
}

export function RefreshMetadataButton({ nftID }: RefreshMetadataButtonProps) {
    const { status, error, refreshTokenMetadata, resetState } = useMetadataRefresh(nftID);

    const loading = status === RefreshStatus.PENDING;
    const text = loading ? 'Reloading...' : ' Reload metadata';

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

        <ErrorMessageModal
            isOpen={status === RefreshStatus.REJECTED}
            error={error}
            onClose={resetState}
        />
    </>);
}