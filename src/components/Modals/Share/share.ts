import * as links from './links';

const WINDOW_WIDTH = 600;
const WINDOW_HEIGHT = 550;

export function createLink(network: string, data: any) {
    return links[network]?.(data);
}

function openWindow(url: string, { width, height, top, left }: { width: number, height: number, top: number, left: number }) {
    const target = '';
    const config = {
        top,
        left,
        width,
        height,
        location: 'no',
        toolbar: 'no',
        status: 'no',
        directories: 'no',
        menubar: 'no',
        scrollbars: 'yes',
        resizable: 'no',
        centerscreen: 'yes',
        chrome: 'yes'
    };

    const shareDialog = window.open(
        url,
        target,
        Object.keys(config)
            .map(key => `${ key }=${ config[key] }`)
            .join(', ')
    );

    return shareDialog;
}

function getBoxPositionOnWindowCenter(width: number, height: number) {
    return {
        left: window.outerWidth / 2 + (window.screenX || window.screenLeft || 0) - width / 2,
        top: window.outerHeight / 2 + (window.screenY || window.screenTop || 0) - height / 2,
    };
}

export function socialShare(link: string) {
    const windowConfig = {
        width: WINDOW_WIDTH,
        height: WINDOW_HEIGHT,
        ...getBoxPositionOnWindowCenter(
            WINDOW_WIDTH,
            WINDOW_HEIGHT
        )
    };

    openWindow(link, windowConfig);
}