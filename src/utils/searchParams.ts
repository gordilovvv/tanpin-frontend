export function urlSearchParams(params: Record<string, string | number | boolean | undefined | null>) {
    return new URLSearchParams(
        JSON.parse(
            JSON.stringify({
                ...params,
            }),
        ),
    );
}