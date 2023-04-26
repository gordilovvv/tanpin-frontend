import axios from 'axios';
import type { GamesQueryBody, GamesQueryResponse } from '../types';
import { MOCK_API_CALLS } from '@/config';

export async function fetchGames(body: GamesQueryBody): Promise<GamesQueryResponse[]> {
    if (MOCK_API_CALLS) {
        return [{
            ID: '0',
            name: 'NFTGTA',
            imageURL: 'https://c4.wallpaperflare.com/wallpaper/514/241/320/gta-5-online-wallpaper-preview.jpg',
            logoURL: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/nft-logo-design-template-9a41fca75305c8d9d529826cee16e8b9_screen.jpg?ts=1680286272',
            stats: {
                volume: {
                    currency: 'USDT',
                    amount: '1680286272'
                },
                items: 256,
                collections: 3
            },
            popularCollections: [{
                ID: '0',
                name: 'Hello',
                description: 'World',
                logoURL: 'https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg',
                stats: {
                    volume: {
                        currency: 'USDT',
                        amount: '168086272'
                    },
                    floor: {
                        currency: 'USDT',
                        amount: '1680286272'
                    }
                }
            }, {
                ID: '1',
                name: 'Hello',
                description: 'World',
                logoURL: 'https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg',
                stats: {
                    volume: {
                        currency: 'USDT',
                        amount: '1680286272'
                    },
                    floor: {
                        currency: 'USDT',
                        amount: '1680286272'
                    }
                }
            }, {
                ID: '2',
                name: 'Hello',
                description: 'World',
                logoURL: 'https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg',
                stats: {
                    volume: {
                        currency: 'USDT',
                        amount: '1680286272'
                    },
                    floor: {
                        currency: 'USDT',
                        amount: '1680286272'
                    }
                }
            }, {
                ID: '3',
                name: 'Hello',
                description: 'World',
                logoURL: 'https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg',
                stats: {
                    volume: {
                        currency: 'USDT',
                        amount: '168086272'
                    },
                    floor: {
                        currency: 'USDT',
                        amount: '1680286272'
                    }
                }
            },]
        }, {
            ID: '0',
            name: 'NFTGTA',
            imageURL: 'https://c4.wallpaperflare.com/wallpaper/514/241/320/gta-5-online-wallpaper-preview.jpg',
            logoURL: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/nft-logo-design-template-9a41fca75305c8d9d529826cee16e8b9_screen.jpg?ts=1680286272',
            stats: {
                volume: {
                    currency: 'USDT',
                    amount: '1680286272'
                },
                items: 256,
                collections: 3
            },
            popularCollections: [{
                ID: '0',
                name: 'Hello',
                description: 'World',
                logoURL: 'https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg',
                stats: {
                    volume: {
                        currency: 'USDT',
                        amount: '168086272'
                    },
                    floor: {
                        currency: 'USDT',
                        amount: '1680286272'
                    }
                }
            }, {
                ID: '1',
                name: 'Hello',
                description: 'World',
                logoURL: 'https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg',
                stats: {
                    volume: {
                        currency: 'USDT',
                        amount: '1680286272'
                    },
                    floor: {
                        currency: 'USDT',
                        amount: '1680286272'
                    }
                }
            }, {
                ID: '2',
                name: 'Hello',
                description: 'World',
                logoURL: 'https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg',
                stats: {
                    volume: {
                        currency: 'USDT',
                        amount: '1680286272'
                    },
                    floor: {
                        currency: 'USDT',
                        amount: '1680286272'
                    }
                }
            }, {
                ID: '3',
                name: 'Hello',
                description: 'World',
                logoURL: 'https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg',
                stats: {
                    volume: {
                        currency: 'USDT',
                        amount: '168086272'
                    },
                    floor: {
                        currency: 'USDT',
                        amount: '1680286272'
                    }
                }
            },]
        }, {
            ID: '2',
            name: 'NFTGTA',
            imageURL: 'https://c4.wallpaperflare.com/wallpaper/514/241/320/gta-5-online-wallpaper-preview.jpg',
            logoURL: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/nft-logo-design-template-9a41fca75305c8d9d529826cee16e8b9_screen.jpg?ts=1680286272',
            stats: {
                volume: {
                    currency: 'USDT',
                    amount: '1680286272'
                },
                items: 256,
                collections: 3
            },
            popularCollections: [{
                ID: '0',
                name: 'Hello',
                description: 'World',
                logoURL: 'https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg',
                stats: {
                    volume: {
                        currency: 'USDT',
                        amount: '168086272'
                    },
                    floor: {
                        currency: 'USDT',
                        amount: '1680286272'
                    }
                }
            }, {
                ID: '1',
                name: 'Hello',
                description: 'World',
                logoURL: 'https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg',
                stats: {
                    volume: {
                        currency: 'USDT',
                        amount: '1680286272'
                    },
                    floor: {
                        currency: 'USDT',
                        amount: '1680286272'
                    }
                }
            }, {
                ID: '2',
                name: 'Hello',
                description: 'World',
                logoURL: 'https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg',
                stats: {
                    volume: {
                        currency: 'USDT',
                        amount: '1680286272'
                    },
                    floor: {
                        currency: 'USDT',
                        amount: '1680286272'
                    }
                }
            }, {
                ID: '3',
                name: 'Hello',
                description: 'World',
                logoURL: 'https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg',
                stats: {
                    volume: {
                        currency: 'USDT',
                        amount: '168086272'
                    },
                    floor: {
                        currency: 'USDT',
                        amount: '1680286272'
                    }
                }
            },]
        }, {
            ID: '4',
            name: 'NFTGTA',
            imageURL: 'https://c4.wallpaperflare.com/wallpaper/514/241/320/gta-5-online-wallpaper-preview.jpg',
            logoURL: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/nft-logo-design-template-9a41fca75305c8d9d529826cee16e8b9_screen.jpg?ts=1680286272',
            stats: {
                volume: {
                    currency: 'USDT',
                    amount: '1680286272'
                },
                items: 256,
                collections: 3
            },
            popularCollections: [{
                ID: '0',
                name: 'Hello',
                description: 'World',
                logoURL: 'https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg',
                stats: {
                    volume: {
                        currency: 'USDT',
                        amount: '168086272'
                    },
                    floor: {
                        currency: 'USDT',
                        amount: '1680286272'
                    }
                }
            }, {
                ID: '1',
                name: 'Hello',
                description: 'World',
                logoURL: 'https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg',
                stats: {
                    volume: {
                        currency: 'USDT',
                        amount: '1680286272'
                    },
                    floor: {
                        currency: 'USDT',
                        amount: '1680286272'
                    }
                }
            }, {
                ID: '2',
                name: 'Hello',
                description: 'World',
                logoURL: 'https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg',
                stats: {
                    volume: {
                        currency: 'USDT',
                        amount: '1680286272'
                    },
                    floor: {
                        currency: 'USDT',
                        amount: '1680286272'
                    }
                }
            }, {
                ID: '3',
                name: 'Hello',
                description: 'World',
                logoURL: 'https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg',
                stats: {
                    volume: {
                        currency: 'USDT',
                        amount: '168086272'
                    },
                    floor: {
                        currency: 'USDT',
                        amount: '1680286272'
                    }
                }
            },]
        }];
    }


    const { data } = await axios.post<GamesQueryResponse[]>('/game.get.list', body);
    return data;
}

