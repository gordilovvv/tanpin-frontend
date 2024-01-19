import { Address } from 'viem';
import { authorizeSession, createSession, destroySession, generateRandomSessionKey } from './sessionManager';
import { logError } from '../sentry';

export enum AUTH_STATUS {
    NOT_READY = 'not_ready',
    READY = 'ready',
    CONNECTING = 'connecting',
    CONNECTED = 'connected',
}

export type TelegramAuthState = {
    address?: Address,
    username?: string,
    privateKey?: `0x${string}`
}

export class TelegramAuth {
    state: TelegramAuthState = {};
    status: AUTH_STATUS = AUTH_STATUS.NOT_READY;

    // Session
    private sessionId: string | undefined;
    private sessionBaseUrl: string;

    // Storage
    private sessionStorage = localStorage;
    private sessionStorageKey: string = 'tg:session:id';

    constructor({ sessionBaseUrl }: { sessionBaseUrl: string }) {
        this.sessionBaseUrl = sessionBaseUrl;
    }

    get connecting() {
        return this.status === AUTH_STATUS.CONNECTING;
    }

    get connected() {
        return this.status === AUTH_STATUS.CONNECTED;
    }

    get privateKey() {
        return this.state.privateKey;
    }

    async init() {
        const sessionId = localStorage.getItem(this.sessionStorageKey) as string | undefined;

        try {
            // Если есть сессия - получить по ключу данные кошелька
            if (sessionId) {
                this.sessionId = sessionId;
                const { address, username, privateKey } = await this.authorizeSession();

                this.state = {
                    address,
                    username,
                    privateKey
                };

                this.status = AUTH_STATUS.CONNECTED;
            }
        } catch (error) {
            logError(error);
            this.clearSessionStorage();
            this.status = AUTH_STATUS.READY;
        }
    }

    async connect({ telegramQuery, sessionLifetime = 86400 }: { telegramQuery?: string, sessionLifetime?: number } = {}) {
        if (this.status === AUTH_STATUS.CONNECTING || this.status === AUTH_STATUS.CONNECTED) {
            return;
        }

        this.status = AUTH_STATUS.CONNECTING;

        try {
            if (!this.privateKey) {
                // Если передали параметры Telegram, то создаем сессию и авторизуем ее на сервере
                if (telegramQuery) {
                    const { success } = await this.connectWithTelegram(telegramQuery, sessionLifetime);

                    if (!success) {
                        throw new Error('Telegram auth rejected!');
                    }
                }

                // Синхронизировать сессию
                const { address, username, privateKey } = await this.authorizeSession();

                this.state = {
                    address,
                    username,
                    privateKey
                };
            }

            this.status = AUTH_STATUS.CONNECTED;
        } catch (error) {
            this.status = AUTH_STATUS.READY;
            throw error;
        }
    }

    async disconnect() {
        if (this.status !== AUTH_STATUS.CONNECTED || !this.sessionId) {
            throw new Error('User not logged in!');
        }

        await destroySession({
            sessionId: this.sessionId,
            sessionBaseUrl: this.sessionBaseUrl
        });

        this.clearSessionStorage();

        this.state = {};
        this.status = AUTH_STATUS.READY;
    }

    /** 
     * Авторизовать вход Telegram
     * Отправить на бекенд данные входа и сохранить сессию. Далее по этой сессии будем получать кошелек
     */
    private async connectWithTelegram(query: string, sessionLifetime: number) {
        const sessionId = generateRandomSessionKey();

        const queryParams = new URLSearchParams(query);
        queryParams.append('sessionId', sessionId);
        queryParams.append('sessionLifetime', String(sessionLifetime));

        const authUrl = new URL(`${this.sessionBaseUrl}/auth`);
        authUrl.search = queryParams.toString();

        const { data: authResponse } = await createSession<{ success: boolean }>(authUrl.toString());

        // Сохранить сессию в хранилище
        if (authResponse.success) {
            this.saveSessionStorage(sessionId);
        }

        return authResponse;
    }

    /** Авторизовать сессию - получить кошелек с сервера */
    private async authorizeSession(): Promise<Partial<TelegramAuthState>> {
        if (!this.sessionId) {
            throw new Error('authorizeSession is missing id!');
        }

        return authorizeSession({
            sessionId: this.sessionId,
            sessionBaseUrl: this.sessionBaseUrl
        });
    }

    private saveSessionStorage(sessionId: string) {
        this.sessionId = sessionId;
        this.sessionStorage.setItem(this.sessionStorageKey, sessionId);
    }

    private clearSessionStorage() {
        this.sessionId = undefined;
        this.sessionStorage.removeItem(this.sessionStorageKey);
    }
}