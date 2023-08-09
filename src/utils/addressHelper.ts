import { getAddress } from 'viem';

/**
 * Function converts address to short format
 * @example 0x331F...C81F 
 */
export function ellipseAddress(address: string) {
    return `${address.slice(0, 6)}...${address.slice(address.length - 4)}`;
}

export function isAddressEqual(address1: string, address2: string) {
    try {
        return getAddress(address1) === getAddress(address2);
    } catch (error) {
        return false;
    }
}

/**
 * Function supports ERC721 & ERC1155 (Multiple owners)
 */
export function isAddressOwner(address: string | undefined, owner: string): boolean
export function isAddressOwner(address: string | undefined, owners: string[]): boolean
export function isAddressOwner(address: string | undefined, ownerOrOwners: string | string[]): boolean {
    if (!address) {
        return false;
    }

    if (typeof ownerOrOwners === 'string') {
        return isAddressEqual(ownerOrOwners, address);
    }

    const matchedOwner = ownerOrOwners.find(
        owner => isAddressEqual(owner, address)
    );

    return !!matchedOwner;
}