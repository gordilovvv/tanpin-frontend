import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const STORAGE_KEY = 'tanpin.r';

const parseReferralCode = (str?: string | null) => {
    if (!str) {
        return;
    }

    const code = parseInt(str);

    if (isNaN(code)) {
        return;
    }

    return code;
};

export function getReferralCode() {
    const code = localStorage.getItem(STORAGE_KEY);

    return parseReferralCode(code);
}

export function saveReferralCode(str: string) {
    const code = parseReferralCode(str);

    if (code) {
        localStorage.setItem(STORAGE_KEY, String(code));
    }
}

/** Find & save referral code in URL */
export function useReferralCodeDetector() {
    const [searchParams] = useSearchParams();
    const referralId = searchParams.get('r');

    useEffect(() => {
        if (referralId) {
            saveReferralCode(referralId);
        }
    }, [referralId]);
}