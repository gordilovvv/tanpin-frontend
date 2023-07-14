import { Modal, ModalBody, ModalHead, ModalProps } from '@/uikit';
import styles from './MobileFilter.module.scss';
import { Filter } from '@/components/Explorer';
import { Collection } from '@/states/collection/types';
import { NFTExplorerCategory } from '@/states/explorer/types';

type MobileFilterProps = {
    explorer: `${NFTExplorerCategory}`
    collection?: Collection
} & ModalProps;

export function MobileFilter({ isOpen, explorer, collection, onClose }: MobileFilterProps) {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalHead title='Filters' />

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