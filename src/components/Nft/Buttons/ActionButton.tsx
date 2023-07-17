import { Button, ButtonProps } from '@/uikit';
import { ConnectWalletButton } from '@/components/Menus';
import { useNetwork } from 'wagmi';
import { useAccount } from '@/states/user/hooks/useAccount';
import { useWrongNetworkModal } from '@/states/global/hooks';
import { activeChainId } from '@/config/chain';

type ActionButton = {
    onClick: () => void
} & Omit<ButtonProps<'button'>, 'onClick'>

export function ActionButton({ onClick, children, ...props }: ActionButton) {
    const { chain } = useNetwork();
    const { isConnected } = useAccount();
    const wrongNetworkModal = useWrongNetworkModal();
    const isWrongChain = chain?.id !== activeChainId;

    const handleOnClick = () => {
        if (isWrongChain) {
            return wrongNetworkModal.open();
        }

        onClick?.();
    };

    if (!isConnected) {
        return (<ConnectWalletButton />);
    }

    return (
        <Button
            {...props}
            onClick={handleOnClick}
        >
            {children}
        </Button>
    );
}