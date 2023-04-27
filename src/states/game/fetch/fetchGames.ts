import axios from 'axios';
import { MOCK_API_CALLS } from '@/config';
import type { GamesQueryBody, GamesQueryResponse } from '../types';

export async function fetchGames(
    body: GamesQueryBody
): Promise<GamesQueryResponse[]> {
    if (MOCK_API_CALLS) {
        await new Promise((res) => setTimeout(res, 3000));
        return [
            {
                ID: '0',
                name: 'NFTGTA',
                imageURL:
          'https://c4.wallpaperflare.com/wallpaper/514/241/320/gta-5-online-wallpaper-preview.jpg',
                logoURL:
          'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/nft-logo-design-template-9a41fca75305c8d9d529826cee16e8b9_screen.jpg?ts=1290',
                stats: {
                    volume: {
                        currency: 'USDT',
                        amount: '1290',
                    },
                    items: 256,
                    collections: 3,
                },
                popularCollections: [
                    {
                        ID: '0',
                        name: 'Hello',
                        description: 'World',
                        logoURL:
              'https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg',
                        // @ts-ignore
                        stats: {
                            volume: {
                                currency: 'USDT',
                                amount: '1290',
                            },
                            floor: {
                                currency: 'USDT',
                                amount: '1290',
                            },
                        },
                    },
                    {
                        ID: '1',
                        name: 'Hello',
                        description: 'World',
                        logoURL:
              'https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg',
                        // @ts-ignore
                        stats: {
                            volume: {
                                currency: 'USDT',
                                amount: '1290',
                            },
                            floor: {
                                currency: 'USDT',
                                amount: '1290',
                            },
                        },
                    },
                    {
                        ID: '2',
                        name: 'Hello',
                        description: 'World',
                        logoURL:
              'https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg',
                        // @ts-ignore
                        stats: {
                            volume: {
                                currency: 'USDT',
                                amount: '1290',
                            },
                            floor: {
                                currency: 'USDT',
                                amount: '1290',
                            },
                        },
                    },
                    {
                        ID: '3',
                        name: 'Hello',
                        description: 'World',
                        logoURL:
              'https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg',
                        // @ts-ignore
                        stats: {
                            volume: {
                                currency: 'USDT',
                                amount: '1290',
                            },
                            floor: {
                                currency: 'USDT',
                                amount: '1290',
                            },
                        },
                    },
                ],
            },
            {
                ID: '1',
                name: 'Minecraft',
                imageURL:
          'https://img.redbull.com/images/c_fill,w_1200,h_630,g_auto,f_auto,q_auto/redbullcom/2020/4/28/bjoyslzjb3uxqyg82uz2/minecraft',
                logoURL: 'https://img.icons8.com/color/512/minecraft-logo--v1.png',
                // @ts-ignore
                stats: {
                    volume: {
                        currency: 'USDT',
                        amount: '1290',
                    },
                    items: 256,
                    collections: 3,
                },
                popularCollections: [
                    {
                        ID: '0',
                        name: 'Hello',
                        description: 'World',
                        logoURL:
              'https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg',
                        // @ts-ignore
                        stats: {
                            volume: {
                                currency: 'USDT',
                                amount: '1290',
                            },
                            floor: {
                                currency: 'USDT',
                                amount: '1290',
                            },
                        },
                    },
                    {
                        ID: '1',
                        name: 'Hello',
                        description: 'World',
                        logoURL:
              'https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg',
                        // @ts-ignore
                        stats: {
                            volume: {
                                currency: 'USDT',
                                amount: '1290',
                            },
                            floor: {
                                currency: 'USDT',
                                amount: '1290',
                            },
                        },
                    },
                    {
                        ID: '2',
                        name: 'Hello',
                        description: 'World',
                        logoURL:
              'https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg',
                        // @ts-ignore
                        stats: {
                            volume: {
                                currency: 'USDT',
                                amount: '1290',
                            },
                            floor: {
                                currency: 'USDT',
                                amount: '1290',
                            },
                        },
                    },
                    {
                        ID: '3',
                        name: 'Hello',
                        description: 'World',
                        logoURL:
              'https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg',
                        // @ts-ignore
                        stats: {
                            volume: {
                                currency: 'USDT',
                                amount: '1290',
                            },
                            floor: {
                                currency: 'USDT',
                                amount: '1290',
                            },
                        },
                    },
                ],
            },
            {
                ID: '2',
                name: 'Fortnite',
                imageURL:
          'https://cdn2.unrealengine.com/social-image-battlepass-3840x2160-19b42864f188.jpg',
                logoURL:
          'https://upload.wikimedia.org/wikipedia/commons/7/7c/Fortnite_F_lettermark_logo.png',
                // @ts-ignore
                stats: {
                    volume: {
                        currency: 'USDT',
                        amount: '1290',
                    },
                    items: 256,
                    collections: 3,
                },
                popularCollections: [
                    {
                        ID: '0',
                        name: 'Hello',
                        description: 'World',
                        logoURL:
              'https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg',
                        // @ts-ignore
                        stats: {
                            volume: {
                                currency: 'USDT',
                                amount: '1290',
                            },
                            floor: {
                                currency: 'USDT',
                                amount: '1290',
                            },
                        },
                    },
                    {
                        ID: '1',
                        name: 'Hello',
                        description: 'World',
                        logoURL:
              'https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg',
                        // @ts-ignore
                        stats: {
                            volume: {
                                currency: 'USDT',
                                amount: '1290',
                            },
                            floor: {
                                currency: 'USDT',
                                amount: '1290',
                            },
                        },
                    },
                    {
                        ID: '2',
                        name: 'Hello',
                        description: 'World',
                        logoURL:
              'https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg',
                        // @ts-ignore
                        stats: {
                            volume: {
                                currency: 'USDT',
                                amount: '1290',
                            },
                            floor: {
                                currency: 'USDT',
                                amount: '1290',
                            },
                        },
                    },
                    {
                        ID: '3',
                        name: 'Hello',
                        description: 'World',
                        logoURL:
              'https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg',
                        // @ts-ignore
                        stats: {
                            volume: {
                                currency: 'USDT',
                                amount: '1290',
                            },
                            floor: {
                                currency: 'USDT',
                                amount: '1290',
                            },
                        },
                    },
                ],
            },
            {
                ID: '4',
                name: 'NFTGTA',
                imageURL:
          'https://c4.wallpaperflare.com/wallpaper/514/241/320/gta-5-online-wallpaper-preview.jpg',
                logoURL:
          'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/nft-logo-design-template-9a41fca75305c8d9d529826cee16e8b9_screen.jpg?ts=1290',
                // @ts-ignore
                stats: {
                    volume: {
                        currency: 'USDT',
                        amount: '1290',
                    },
                    items: 256,
                    collections: 3,
                },
                popularCollections: [
                    {
                        ID: '0',
                        name: 'Hello',
                        description: 'World',
                        logoURL:
              'https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg',
                        // @ts-ignore
                        stats: {
                            volume: {
                                currency: 'USDT',
                                amount: '1290',
                            },
                            floor: {
                                currency: 'USDT',
                                amount: '1290',
                            },
                        },
                    },
                    {
                        ID: '1',
                        name: 'Hello',
                        description: 'World',
                        logoURL:
              'https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg',
                        // @ts-ignore
                        stats: {
                            volume: {
                                currency: 'USDT',
                                amount: '1290',
                            },
                            floor: {
                                currency: 'USDT',
                                amount: '1290',
                            },
                        },
                    },
                    {
                        ID: '2',
                        name: 'Hello',
                        description: 'World',
                        logoURL:
              'https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg',
                        // @ts-ignore
                        stats: {
                            volume: {
                                currency: 'USDT',
                                amount: '1290',
                            },
                            floor: {
                                currency: 'USDT',
                                amount: '1290',
                            },
                        },
                    },
                    {
                        ID: '3',
                        name: 'Hello',
                        description: 'World',
                        logoURL:
              'https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg',
                        // @ts-ignore
                        stats: {
                            volume: {
                                currency: 'USDT',
                                amount: '1290',
                            },
                            floor: {
                                currency: 'USDT',
                                amount: '1290',
                            },
                        },
                    },
                ],
            },
        ];
    }

    const { data } = await axios.post<GamesQueryResponse[]>(
        '/game.get.list',
        body
    );

    return data;
}
