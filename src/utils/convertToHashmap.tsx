export function convertToHashmap(array) {
    const hashmap = {};

    for (const item of array) {
        const { traitType, values } = item;
        const valuesObject = {};

        for (const value of values) {
            valuesObject[value] = true;
        }

        hashmap[traitType] = valuesObject;
    }

    return hashmap;
}

