export type Collection = {
    ID: string;
    chain: string;
    address: string;
    gameID: string;
    gameName: string;
    name: string;
    description?: string;
    logoUrl: string;
    coverUrl: string;
    createdAt: Date;
};

/** Response from server */
export type CollectionRes = Omit<Collection, 'ID' | 'gameID'> & {
    id: string,
    gameId: string
};

export enum CollectionsSort {
    NEWEST = 'newest',
    OLDEST = 'oldest'
}