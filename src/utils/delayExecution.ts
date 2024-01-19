export async function delayExecution(
    fn: () => Promise<void>,
    minDelay: number
) {
    const startTime = Date.now();

    await fn();

    const elapsedTime = Date.now() - startTime;

    if (elapsedTime < minDelay) {
        await new Promise(resolve => setTimeout(resolve, minDelay - elapsedTime));
    }
}