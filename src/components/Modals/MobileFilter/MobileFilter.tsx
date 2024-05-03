import { Modal, ModalBody, ModalHead, ModalProps } from '@/uikit';
import styles from './MobileFilter.module.scss';
import { Filter } from '@/components/Explorer';
import { CollectionWithAttributes } from '@/states/collection/types';
import { NFTExplorerCategory } from '@/states/explorer/types';
import { useTranslation } from '@/localization';

type MobileFilterProps = {
    explorer: `${NFTExplorerCategory}`
    collection?: CollectionWithAttributes
} & ModalProps;

export function MobileFilter({ isOpen, explorer, collection, onClose }: MobileFilterProps) {
    const { t } = useTranslation();

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalHead title={t('Filters')} />

            <ModalBody className={styles.body}>
                <Filter
                    explorer={explorer}
                    collection={collection}
                    filterOnButton
                    onFilterApply={onClose}
                    onFilterReset={onClose}
                />
            </ModalBody>
        </Modal>
    );
}