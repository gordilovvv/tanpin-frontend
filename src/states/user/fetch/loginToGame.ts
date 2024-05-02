import { api } from '@/app/api';

/**
 * Вход в игру означает проверить что пользователь владеет кошельком,
 * далее API отправит игре уведомление что user владеет кошельком 0x
 * 
 * @param userKey - id аккаунта, игрока и тд
 */
export async function loginToGame({
    gameID,
    userKey,
    address,
    message,
    signature,
    hash
}: {
    gameID: string,
    userKey: string,
    address: `0x${string}`,
    message: string,
    signature: string,
    hash: string
}) {
    const { data } = await api.post<{ address: `0x${string}` }>('/game/login', {
        game: gameID,
        key: userKey,
        address,
        message,
        signature,
        hash
    });

    return data;
}