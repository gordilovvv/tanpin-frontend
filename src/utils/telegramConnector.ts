import { Connector, ConnectorData, WalletClient } from 'wagmi';
import { Address, Chain, FallbackTransport, createWalletClient } from 'viem';
import { privateKeyToAccount, privateKeyToAddress } from 'viem/accounts';
import { TelegramAuth } from './telegram/TelegramAuth';

const IS_SERVER = typeof window === 'undefined';

export class TelegramConnector extends Connector<unknown, { name: string }> {
    ready = !IS_SERVER;

    readonly id = 'telegram';
    readonly name = 'Telegram';

    private telegramAuth: TelegramAuth;
    private initializationPromise: Promise<void>; // We have to wait initialization of telegramAuth

    private transport: FallbackTransport;

    constructor({
        chains,
        options: _options
    }: {
        chains?: Chain[],
        options: {
            transport: FallbackTransport,
            sessionBaseUrl: string
        }
    }) {
        const options = {
            name: 'Telegram'
        };

        super({
            chains,
            options,
        });

        this.transport = _options.transport;

        // Now support only one chain - Polygon and Polygon Mumbai
        this.telegramAuth = new TelegramAuth({
            sessionBaseUrl: _options.sessionBaseUrl
        });

        this.initializationPromise = this.telegramAuth.init();
    }

    async connect(): Promise<Required<ConnectorData>> {
        const account = await this.getAccount();
        const id = await this.getChainId();
        const unsupported = this.isChainUnsupported(id);

        return {
            account,
            chain: {
                id,
                unsupported
            }
        };
    }

    /**
     * Сейчас в стандартную функцию `connect` передать данные вместе с конфигом нельзя.
     * Поэтому создана вторая функция для использования снаружи.
     * 
     * 1. Вызвать `loginWithTelegram`
     * 2. Вызвать `connect`
     * 
     * TODO: проверить после миграции на wagmi 2.0
     */
    async loginWithTelegram(params: {
        authQuery: string,
        sessionLifetime?: number
    }) {
        if (this.telegramAuth.connecting) {
            throw new Error('Telegram is connecting!');
        }

        await this.waitForTelegramInit();

        await this.telegramAuth.connect({
            telegramQuery: params.authQuery,
            sessionLifetime: params.sessionLifetime
        });
    }

    async disconnect(): Promise<void> {
        await this.telegramAuth.disconnect();
    }

    async getWalletClient({ chainId }: { chainId?: number } = {}): Promise<WalletClient> {
        const transport = this.transport;
        const privateKey = this.telegramAuth.privateKey;

        if (!privateKey) {
            throw new Error('Telegram connector not connected!');
        }

        const account = privateKeyToAccount(privateKey);
        const chain = this.chains.find((x) => x.id === chainId) ?? this.chains[0];

        return createWalletClient({
            account,
            chain,
            transport
        });
    }

    async getAccount(): Promise<Address> {
        await this.waitForTelegramInit();

        const privateKey = this.telegramAuth.privateKey;

        if (!privateKey) {
            throw new Error('Telegram connector not connected!');
        }

        return privateKeyToAddress(privateKey);
    }

    async getProvider() {
        return {};
    }

    async isAuthorized() {
        try {
            const account = await this.getAccount();

            return !!account;
        } catch {
            return false;
        }
    }

    async getChainId(): Promise<number> {
        return this.chains[0].id; // Because now supports only one chain
    }

    async switchChain() {
        return this.chains[0]; // Because now supports only one chain
    }

    protected isChainUnsupported(chainId: number): boolean {
        return !this.chains.some(chain => chain.id === chainId);
    }

    protected async onAccountsChanged(accounts: string[]): Promise<void> {
        if (!accounts.length) {
            this.onDisconnect();
        } else {
            const account = await this.getAccount();

            this.emit('change', { account });
        }
    }

    protected onChainChanged(chainId: number): void {
        const id = chainId;
        const unsupported = this.isChainUnsupported(chainId);

        this.emit('change', {
            chain: {
                id,
                unsupported
            }
        });
    }

    protected onDisconnect(): void {
        this.emit('disconnect');
    }

    private async waitForTelegramInit() {
        await this.initializationPromise;
    }
}