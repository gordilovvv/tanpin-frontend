import { useState } from "react";

type SharePayload = {
    title: string
    text: string
    url: string
}

export function useShareWebAPI() {
    const [isLoading, setIsLoading] = useState(false);
    const isSupported = navigator.canShare();
    const share = async (data: SharePayload) => {
        try {
            setIsLoading(true)
            await navigator.share(data)
        } catch (e) {
            void e;
        } finally {
            setIsLoading(false);
        }
    }

    return {
        share,
        isSupported,
        isLoading,
    }
}
