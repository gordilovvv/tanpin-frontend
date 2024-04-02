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
    createdAt: string;
};

export type CollectionWithAttributes = Collection & {
    attributes: {
        traitType: string,
        values: string[]
    }[]
}

/** Response from server */
export type CollectionRes = Omit<Collection, 'ID' | 'gameID'> & {
    id: string,
    gameId: string
};

export type CollectionResWithAttributes = CollectionRes & {
    attributes: {
        traitType: string,
        values: string[]
    }[]
}

export enum CollectionsSort {
    NEWEST = 'newest',
    OLDEST = 'oldest'
}