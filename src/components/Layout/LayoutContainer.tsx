import { PropsWithChildren } from 'react';
import { CommonModals } from '@/components/Modals/CommonModals';
import { ScrollTopOnMount } from '@/app/routing/ScrollTopOnMount';
import { useAccountEventListener } from '@/hooks/useAccountEventListener';
import { useReferralCodeDetector } from '@/states/deposit/hooks/useReferralCode';

export default function LayoutContainer({ children }: PropsWithChildren) {
    useAccountEventListener();
    useReferralCodeDetector();

    return (
        <ScrollTopOnMount>
            <CommonModals>
                {children}
            </CommonModals>
        </ScrollTopOnMount>
    );
}