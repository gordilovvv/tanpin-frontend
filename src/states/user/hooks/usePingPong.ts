import { api } from "@/app/api";
import useSWR from 'swr'
import { useUserStore } from '../store'

const ping = () => api.get("/auth.ping");

export function usePingPong() {
    const resetUser = useUserStore(store => store.resetUser);
    useSWR('ping', ping, {
        onError: resetUser
    });
}
