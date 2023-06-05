const separator = '\r\n';

type vkOptions = {
    title?: string;
    image?: string;
    noParse?: boolean;
    noVkLinks?: boolean;
    url: string
  };

function objectToGetParams(obj: object): string {
    const params = Object.entries(obj)
        .filter(([, value]) => value !== undefined && value !== null)
        .map(([key, value]) => `${ encodeURIComponent(key) }=${ encodeURIComponent(String(value)) }`);

    return params.length > 0
        ? `?${ params.join('&') }`
        : '';
}

export function facebook({ url, quote, hashtag }: { url: string, quote: string, hashtag: string }): string {
    return `https://www.facebook.com/sharer/sharer.php${objectToGetParams({
        u: url,
        quote,
        hashtag
    })}`;
}

export function reddit({ url, title }: { url: string, title: string }): string {
    return `https://www.reddit.com/submit${objectToGetParams({
        url,
        title,
    })}`;
}

export function telegram({ url, title }: { url: string, title: string }): string {
    return `https://telegram.me/share/url${objectToGetParams({
        url,
        text: title,
    })}`;
}

export function vk({url,  title, image, noParse, noVkLinks }: vkOptions) {
    return (
        `https://vk.com/share.php${objectToGetParams({
            url,
            title,
            image,
            noparse: noParse ? 1 : 0,
            no_vk_links: noVkLinks ? 1 : 0,
        })}`
    );
}

export function twitter({
    url,
    title,
    via,
    hashtags = [],
    related = []
}: { url: string, title: string, via: string, hashtags: string[], related: string[] }): string {
    return `https://twitter.com/share${objectToGetParams({
        url,
        text: title,
        via,
        hashtags: hashtags.length > 0 ? hashtags.join(',') : undefined,
        related: related.length > 0 ? related.join(',') : undefined,
    })}`;
}

export function whatsapp({ url, title, isMobile }: { url: string, title: string, isMobile: boolean }): string {
    return `https://${ isMobile ? 'api' : 'web' }.whatsapp.com/send${objectToGetParams({
        text: title + separator + url,
    })}`;
}