export async function delayExecution<T>(
    fn: () => Promise<T>,
    minDelay: number
): Promise<T> {
    const startTime = Date.now();
    const result = await fn();
    const elapsedTime = Date.now() - startTime;

    if (elapsedTime < minDelay) {
        await new Promise(resolve => setTimeout(resolve, minDelay - elapsedTime));
    }

    return result;
}